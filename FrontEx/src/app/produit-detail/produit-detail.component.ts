import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProduitService } from '../produit.service';
import { Produit } from '../Model/produit.model';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog'; 
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component'; 
@Component({
  selector: 'app-produit-detail',
  templateUrl: './produit-detail.component.html',
  styleUrls: ['./produit-detail.component.css']
})
export class ProduitDetailComponent implements OnInit {
  produit: Produit | undefined;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
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

  deleteProduit(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { message: 'Êtes-vous sûr de vouloir supprimer cet enregsitrement ?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.produitService.deleteProduit(id).subscribe(() => {
          this.location.back();
        });
      }
    });
  }
}
