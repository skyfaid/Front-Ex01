// src/app/produit-list/produit-list.component.ts

import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../produit.service';
import { Produit } from '../produit.model';

@Component({
  selector: 'app-produit-list',
  templateUrl: './produit-list.component.html',
  styleUrls: ['./produit-list.component.css']
})
export class ProduitListComponent implements OnInit {
  produits: Produit[] = [];

  constructor(private produitService: ProduitService) { }

  ngOnInit(): void {
    this.produitService.getProduits().subscribe(data => {
      this.produits = data;
    });
  }
}
