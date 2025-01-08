export interface ResponseAPIGetPurchaseById {
    result:                  Result;
    id:                      number;
    exception:               null;
    status:                  number;
    isCanceled:              boolean;
    isCompleted:             boolean;
    isCompletedSuccessfully: boolean;
    creationOptions:         number;
    asyncState:              null;
    isFaulted:               boolean;
}

export interface Result {
    purchaseDate:       string;
    totalPurchasePrice: number;
    productDetails:     ProductDetail[];
}

export interface ProductDetail {
    nameProduct: string;
    type:        string;
    price:       string;
    quantity:    string;
    totalPrice:  string;
}