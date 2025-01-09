export interface Product {
  id:      string;
  name:    string;
  price:   string;
  stock:   string;
  image:   Image;
  enabled: Enabled;
  type:    string;
}

export enum Enabled {
  Deshabilitado = "Deshabilitado",
  Habilitado = "Habilitado",
}

export enum Image {
  Imagen = "imagen",
}