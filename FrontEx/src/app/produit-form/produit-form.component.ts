import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import Validators
import { ProduitService } from '../produit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from '../Model/produit.model';
import { Unite } from '../Model/unite.model';

@Component({
  selector: 'app-produit-form',
  templateUrl: './produit-form.component.html',
  styleUrls: ['./produit-form.component.css']
})
export class ProduitFormComponent implements OnInit {
  produitForm: FormGroup;
  isEditMode = false;
  produitId: number | null = null;
  unites: Unite[] = [];

  constructor(
    private fb: FormBuilder,
    private produitService: ProduitService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.produitForm = this.fb.group({
      produitlibelle: ['', [Validators.required, Validators.maxLength(100)]], 
      produitdescription: ['', Validators.maxLength(1000)], 
      unitereference:['',Validators.required],
      produitreference:['']
      
    });
  }

  ngOnInit(): void {
    this.loadUnites();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.produitId = +id;
      this.produitService.getProduit(this.produitId).subscribe(data => {
        console.log('Loaded Produit data:', data);
        this.produitForm.patchValue(data);
        this.produitForm.get('unitereference')?.setValue(data.unitereference);
        console.log('Form value after patch:', this.produitForm.value);
      });
    }
  }

  loadUnites(): void {
    this.produitService.getAllUnites().subscribe(data => {
      this.unites = data;
    });
  }

  getFormControlErrors(controlName: string): string | null {
    const control = this.produitForm.get(controlName);
    if (control && control.errors) {
      if (control.errors['required']) {
        return 'This field is required';
      } else if (control.errors['maxlength']) {
        return `Maximum length is ${control.errors['maxlength'].requiredLength}`;
      }
    }
    return null;
  }
  

  onSubmit(): void {
    if (this.produitForm.invalid) {
      // Highlight errors
      for (const controlName in this.produitForm.controls) {
        if (this.produitForm.controls.hasOwnProperty(controlName)) {
          this.produitForm.controls[controlName].markAsTouched();
        }
      }
      return;
    }
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
  

  goBack(): void {
    this.router.navigate(['/produits']); 
  }
  deleteProduit(): void {
    
  }
}
