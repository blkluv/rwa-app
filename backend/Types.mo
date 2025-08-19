module {
    public type AssetId = Nat;
    public type ShareId = Nat;
    public type Account = { owner : Principal; subaccount : ?Blob };

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
};
