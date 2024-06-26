// src/app/produit.model.ts

export interface Produit {
  produitreference: number;
  produitlibelle: string;
  produitdescription: string | null;
  unitereference: number; // Assuming it's an ID referencing Unite entity
  unitelibelle: string; // New field for unitelibelle
}
