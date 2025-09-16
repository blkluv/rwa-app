import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Buffer "mo:base/Buffer";
import Error "mo:base/Error";
import HashMap "mo:base/HashMap";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Float "mo:base/Float";
import Text "mo:base/Text";
import Hash "mo:base/Hash";

shared ({ caller = initializer }) persistent actor class RWA() = this {

    // Type definitions
    public type AssetId = Nat;
    public type ShareId = Nat;
    
    public type Account = {
        owner : Principal;
        subaccount : ?Blob;
    };
    
    public type Share = {
        id : ShareId;
        assetId : AssetId;
        owner : Principal;
        percentage : Float;
        price : Nat;
    };

    public type Asset = {
        id : AssetId;
        creator : Principal;
        title : Text;
        description : Text;
        location : Text;
        valuation : Nat;
        totalShares : Nat;
        sharesAvailable : Nat;
        images : [Text];
        createdAt : Int;
        isActive : Bool;
    };

    public type AssetRequest = {
        title : Text;
        description : Text;
        location : Text;
        valuation : Nat;
        totalShares : Nat;
        images : [Text];
    };

    public type Transaction = {
        id : Nat;
        assetId : AssetId;
        shareId : ShareId;
        buyer : Principal;
        seller : Principal;
        price : Nat;
        timestamp : Int;
    };

    public type Error = {
        #NotFound;
        #Unauthorized;
        #InsufficientShares;
        #InvalidPrice;
        #AssetNotActive;
        #TransferFailed;
    };

    // Stable variables
    stable var nextAssetId : AssetId = 1;
    stable var nextShareId : ShareId = 1;
    stable var nextTransactionId : Nat = 1;
    stable var admin : Principal = initializer; // Added stable admin variable

    stable var assetsEntries : [(AssetId, Asset)] = [];
    stable var sharesEntries : [(ShareId, Share)] = [];
    stable var transactionsEntries : [(Nat, Transaction)] = [];

    // Hash function
    private func natHash(n : Nat) : Hash.Hash {
        Text.hash(Nat.toText(n));
    };

    // Initialize HashMaps
    flexible var assets = HashMap.HashMap<AssetId, Asset>(0, Nat.equal, natHash);
flexible var shares = HashMap.HashMap<ShareId, Share>(0, Nat.equal, natHash);
flexible var transactions = HashMap.HashMap<Nat, Transaction>(0, Nat.equal, natHash);

    // System upgrade functions - FIXED VERSION
    system func preupgrade() {
        assetsEntries := Iter.toArray(assets.entries());
        sharesEntries := Iter.toArray(shares.entries());
        transactionsEntries := Iter.toArray(transactions.entries());
    };

    system func postupgrade() {
        // Create new empty maps
        let newAssets = HashMap.HashMap<AssetId, Asset>(0, Nat.equal, natHash);
        let newShares = HashMap.HashMap<ShareId, Share>(0, Nat.equal, natHash);
        let newTransactions = HashMap.HashMap<Nat, Transaction>(0, Nat.equal, natHash);
        
        // Repopulate from stable entries (no ignore needed as put returns ())
        for ((id, asset) in assetsEntries.vals()) {
            newAssets.put(id, asset);
        };
        for ((id, share) in sharesEntries.vals()) {
            newShares.put(id, share);
        };
        for ((id, tx) in transactionsEntries.vals()) {
            newTransactions.put(id, tx);
        };
        
        // Assign to mutable variables
        assets := newAssets;
        shares := newShares;
        transactions := newTransactions;
        
        // Clear entries
        assetsEntries := [];
        sharesEntries := [];
        transactionsEntries := [];
    };

    // Admin functions
    public shared ({ caller }) func setAdmin(newAdmin : Principal) : async () {
        assert caller == admin;
        admin := newAdmin;
    };

    // Asset management
    public shared ({ caller }) func createAsset(request : AssetRequest) : async Result.Result<Asset, Error> {
        let asset : Asset = {
            id = nextAssetId;
            creator = caller;
            title = request.title;
            description = request.description;
            location = request.location;
            valuation = request.valuation;
            totalShares = request.totalShares;
            sharesAvailable = request.totalShares;
            images = request.images;
            createdAt = Time.now();
            isActive = true;
        };

        assets.put(nextAssetId, asset);

        // Create initial shares
        let sharePercentage : Float = 100.0 / Float.fromInt(request.totalShares);
        for (i in Iter.range(0, request.totalShares - 1)) {
            let share : Share = {
                id = nextShareId;
                assetId = nextAssetId;
                owner = caller;
                percentage = sharePercentage;
                price = request.valuation / request.totalShares;
            };
            shares.put(nextShareId, share);
            nextShareId += 1;
        };

        nextAssetId += 1;
        #ok(asset);
    };

    public shared ({ caller }) func updateAsset(assetId : AssetId, request : AssetRequest) : async Result.Result<Asset, Error> {
        switch (assets.get(assetId)) {
            case null { #err(#NotFound) };
            case (?asset) {
                if (caller != asset.creator and caller != admin) {
                    return #err(#Unauthorized);
                };

                let updatedAsset : Asset = {
                    id = asset.id;
                    creator = asset.creator;
                    title = request.title;
                    description = request.description;
                    location = request.location;
                    valuation = request.valuation;
                    totalShares = asset.totalShares;
                    sharesAvailable = asset.sharesAvailable;
                    images = request.images;
                    createdAt = asset.createdAt;
                    isActive = asset.isActive;
                };

                assets.put(assetId, updatedAsset);
                #ok(updatedAsset);
            };
        };
    };

    public shared ({ caller }) func toggleAssetStatus(assetId : AssetId) : async Result.Result<Asset, Error> {
        switch (assets.get(assetId)) {
            case null { #err(#NotFound) };
            case (?asset) {
                if (caller != asset.creator and caller != admin) {
                    return #err(#Unauthorized);
                };

                let updatedAsset : Asset = {
                    id = asset.id;
                    creator = asset.creator;
                    title = asset.title;
                    description = asset.description;
                    location = asset.location;
                    valuation = asset.valuation;
                    totalShares = asset.totalShares;
                    sharesAvailable = asset.sharesAvailable;
                    images = asset.images;
                    createdAt = asset.createdAt;
                    isActive = not asset.isActive;
                };

                assets.put(assetId, updatedAsset);
                #ok(updatedAsset);
            };
        };
    };

    // Single implementation of listShareForSale (removed duplicate)
    public shared ({ caller }) func listShareForSale(shareId : ShareId, price : Nat) : async Result.Result<Share, Error> {
        switch (shares.get(shareId)) {
            case null { #err(#NotFound) };
            case (?share) {
                if (share.owner != caller) {
                    return #err(#Unauthorized);
                };

                let updatedShare : Share = {
                    id = share.id;
                    assetId = share.assetId;
                    owner = share.owner;
                    percentage = share.percentage;
                    price = price;
                };

                shares.put(shareId, updatedShare);
                #ok(updatedShare);
            };
        };
    };

    // Single implementation of buyShare (removed duplicate)
    public shared ({ caller }) func buyShare(shareId : ShareId) : async Result.Result<Transaction, Error> {
        switch (shares.get(shareId)) {
            case null { #err(#NotFound) };
            case (?share) {
                switch (assets.get(share.assetId)) {
                    case null { #err(#NotFound) };
                    case (?asset) {
                        if (not asset.isActive) {
                            return #err(#AssetNotActive);
                        };

                        if (share.owner == caller) {
                            return #err(#Unauthorized);
                        };

                        // Update share ownership
                        let updatedShare : Share = {
                            id = share.id;
                            assetId = share.assetId;
                            owner = caller;
                            percentage = share.percentage;
                            price = share.price;
                        };

                        shares.put(shareId, updatedShare);

                        // Update asset available shares
                        let updatedAsset : Asset = {
                            id = asset.id;
                            creator = asset.creator;
                            title = asset.title;
                            description = asset.description;
                            location = asset.location;
                            valuation = asset.valuation;
                            totalShares = asset.totalShares;
                            sharesAvailable = asset.sharesAvailable - 1;
                            images = asset.images;
                            createdAt = asset.createdAt;
                            isActive = asset.isActive;
                        };

                        assets.put(asset.id, updatedAsset);

                        // Record transaction
                        let transaction : Transaction = {
                            id = nextTransactionId;
                            assetId = share.assetId;
                            shareId = share.id;
                            buyer = caller;
                            seller = share.owner;
                            price = share.price;
                            timestamp = Time.now();
                        };

                        transactions.put(nextTransactionId, transaction);
                        nextTransactionId += 1;

                        #ok(transaction);
                    };
                };
            };
        };
    };

    // Query functions remain unchanged
    public query func getAsset(assetId : AssetId) : async Result.Result<Asset, Error> {
        switch (assets.get(assetId)) {
            case null { #err(#NotFound) };
            case (?asset) { #ok(asset) };
        };
    };

    public query func getAllAssets() : async [Asset] {
        Iter.toArray(assets.vals());
    };

    public query func getActiveAssets() : async [Asset] {
        let buffer = Buffer.Buffer<Asset>(0);
        for (asset in assets.vals()) {
            if (asset.isActive) {
                buffer.add(asset);
            };
        };
        Buffer.toArray(buffer);
    };

    public query func getSharesForAsset(assetId : AssetId) : async Result.Result<[Share], Error> {
        switch (assets.get(assetId)) {
            case null { #err(#NotFound) };
            case (?asset) {
                let buffer = Buffer.Buffer<Share>(0);
                for (share in shares.vals()) {
                    if (share.assetId == assetId) {
                        buffer.add(share);
                    };
                };
                #ok(Buffer.toArray(buffer));
            };
        };
    };

    public query func getSharesForOwner(owner : Principal) : async [Share] {
        let buffer = Buffer.Buffer<Share>(0);
        for (share in shares.vals()) {
            if (share.owner == owner) {
                buffer.add(share);
            };
        };
        Buffer.toArray(buffer);
    };

    public query func getTransactionsForAsset(assetId : AssetId) : async Result.Result<[Transaction], Error> {
        switch (assets.get(assetId)) {
            case null { #err(#NotFound) };
            case (?asset) {
                let buffer = Buffer.Buffer<Transaction>(0);
                for (tx in transactions.vals()) {
                    if (tx.assetId == assetId) {
                        buffer.add(tx);
                    };
                };
                #ok(Buffer.toArray(buffer));
            };
        };
    };

    public query func getTransactionsForUser(user : Principal) : async [Transaction] {
        let buffer = Buffer.Buffer<Transaction>(0);
        for (tx in transactions.vals()) {
            if (tx.buyer == user or tx.seller == user) {
                buffer.add(tx);
            };
        };
        Buffer.toArray(buffer);
    };
};