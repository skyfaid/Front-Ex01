// src/app/produit.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from './produit.model';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private apiUrl = 'http://localhost:8000/api/produits';

  constructor(private http: HttpClient) { }

  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiUrl);
  }

  getProduit(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.apiUrl}/${id}`);
  }

  createProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.apiUrl, produit);
  }

  updateProduit(id: number, produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiUrl}/${id}`, produit);
  }

  deleteProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
