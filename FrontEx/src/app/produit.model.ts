// src/app/produit.model.ts

export interface Produit {
    produitreference: number; // Assuming this is the ID
    produitlibelle: string;
    produitdescription: string | null; // Nullable if Symfony allows null
    unitereference: number; // Assuming it's an ID referencing Unite entity
  }
  