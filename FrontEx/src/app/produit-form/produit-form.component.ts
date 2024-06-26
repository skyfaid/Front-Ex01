// src/app/produit-form/produit-form.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProduitService } from '../produit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from '../produit.model';

@Component({
  selector: 'app-produit-form',
  templateUrl: './produit-form.component.html',
  styleUrls: ['./produit-form.component.css']
})
export class ProduitFormComponent implements OnInit {
  produitForm: FormGroup;
  isEditMode = false;
  produitId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private produitService: ProduitService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.produitForm = this.fb.group({
      produitlibelle: [''],
      produitdescription: [''],
      unitereference: [null]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.produitId = +id;
      this.produitService.getProduit(this.produitId).subscribe(data => {
        this.produitForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.produitId) {
      this.produitService.updateProduit(this.produitId, this.produitForm.value).subscribe(() => {
        this.router.navigate(['/produits']);
      });
    } else {
      this.produitService.createProduit(this.produitForm.value).subscribe(() => {
        this.router.navigate(['/produits']);
      });
    }
  }
}
