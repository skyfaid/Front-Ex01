import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProduitListComponent } from './produit-list/produit-list.component';
import { ProduitFormComponent } from './produit-form/produit-form.component';

const routes: Routes = [
  { path: 'produits', component: ProduitListComponent },
  { path: 'produits/add', component: ProduitFormComponent },
  { path: 'produits/edit/:id', component: ProduitFormComponent },
  { path: '', redirectTo: '/produits', pathMatch: 'full' },
  { path: '**', redirectTo: '/produits', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
