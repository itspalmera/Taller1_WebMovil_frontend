export interface ResponseAPIGetAllPurchases {
    result:                  Result[];
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
    purchaseDate:      string;
    idReceiptPurchase: string;
    rut:               string;
    nameUser:          string;
    totalPrice:        string;
}