import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProduitService } from '../produit.service';
import { Produit } from '../Model/produit.model';
import { MatDialog } from '@angular/material/dialog'; 
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component'; 
import { Location } from '@angular/common';

@Component({
  selector: 'app-produit-list',
  templateUrl: './produit-list.component.html',
  styleUrls: ['./produit-list.component.css']
})
export class ProduitListComponent implements OnInit {
  displayedColumns: string[] = ['produitreference', 'produitlibelle', 'unitelibelle', 'produitdescription', 'actions'];
  dataSource: MatTableDataSource<Produit> = new MatTableDataSource();
  pageSizeOptions: number[] = [3, 10, 25, 50, 100]; 
  pageSize: number = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private produitService: ProduitService,
    private router: Router,
    private dialog: MatDialog,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.loadProduits();
  }

  loadProduits(): void {
    this.produitService.getProduits().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onPageSizeChange(event: any): void {
    this.paginator.pageSize = event.value;
    this.loadProduits(); // Reload products with new page size
  }

  editProduit(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  deleteProduit(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { message: 'Êtes-vous sûr de vouloir supprimer cet enregsitrement ?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.produitService.deleteProduit(id).subscribe(() => {
          this.loadProduits(); 
        });
      }
    });
  }
  goBack(): void {
    this.location.back();
  }
}
