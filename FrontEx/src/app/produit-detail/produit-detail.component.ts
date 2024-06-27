import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProduitService } from '../produit.service';
import { Produit } from '../Model/produit.model';

@Component({
  selector: 'app-produit-detail',
  templateUrl: './produit-detail.component.html',
  styleUrls: ['./produit-detail.component.css']
})
export class ProduitDetailComponent implements OnInit {
  produit: Produit | undefined;

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.produitService.getProduit(id).subscribe(data => {
        this.produit = data;
      });
    });
  }
}
