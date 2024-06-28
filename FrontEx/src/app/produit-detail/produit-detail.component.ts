import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProduitService } from '../produit.service';
import { Produit } from '../Model/produit.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-produit-detail',
  templateUrl: './produit-detail.component.html',
  styleUrls: ['./produit-detail.component.css']
})
export class ProduitDetailComponent implements OnInit {
  produit: Produit | undefined;

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.produitService.getProduit(id).subscribe(data => {
        this.produit = data;
      });
    });
  }

  goBack(): void {
    this.location.back();
  }

  editProduit(): void {
    // Implement edit functionality
  }

  deleteProduit(): void {
    // Implement delete functionality
  }
}
