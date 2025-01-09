export interface ResponseAPIGetOnlyProduct {
    id:         number;
    name:       string;
    price:      number;
    stock:      number;
    image:      string;
    enabled:    boolean;
    categoryId: number;
    category:   null;
}
