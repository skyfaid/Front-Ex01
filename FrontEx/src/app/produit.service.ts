import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from './Model/produit.model';
import { Unite } from './Model/unite.model';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private apiUrl = '/api/produits'; 
  private uniteUrl = '/api/unites';

  constructor(private http: HttpClient) { }

  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiUrl);
  }

  getProduit(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.apiUrl}/${id}`);
  }

  createProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(`${this.apiUrl}/new`, produit);
  }

  updateProduit(id: number, produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiUrl}/${id}/edit`, produit);
  }

  deleteProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/delete`);
  }

  getAllUnites(): Observable<Unite[]> {
    return this.http.get<Unite[]>(this.uniteUrl);
  }
}
