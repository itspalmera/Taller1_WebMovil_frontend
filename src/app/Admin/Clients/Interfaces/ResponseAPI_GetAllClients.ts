export interface ResponseAPIGetAllClients {
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
    rut:       string;
    name:      string;
    birthDate: string;
    email:     string;
    gender:    string;
    enable:    string;
}
