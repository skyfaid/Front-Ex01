// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProduitListComponent } from './produit-list/produit-list.component';
import { ProduitDetailComponent } from './produit-detail/produit-detail.component';
import { ProduitFormComponent } from './produit-form/produit-form.component';

const routes: Routes = [
  { path: 'produits', component: ProduitListComponent },
  { path: 'produits/new', component: ProduitFormComponent },
  { path: 'produits/:id', component: ProduitDetailComponent },
  { path: 'produits/edit/:id', component: ProduitFormComponent },
  { path: '', redirectTo: '/produits', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
