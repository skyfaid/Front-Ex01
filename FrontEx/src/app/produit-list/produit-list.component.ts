import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProduitService } from '../produit.service';
import { Produit } from '../Model/produit.model';

declare var $: any;

@Component({
  selector: 'app-produit-list',
  templateUrl: './produit-list.component.html',
  styleUrls: ['./produit-list.component.css']
})
export class ProduitListComponent implements OnInit {
  produits: Produit[] = [];

  constructor(
    private produitService: ProduitService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProduits();
    this.initializeDataTable();
  }

  loadProduits(): void {
    this.produitService.getProduits().subscribe(data => {
      this.produits = data;
    });
  }

  initializeDataTable(): void {
    $(document).ready(() => {
      $('#produitTable').DataTable({
        dom: 'Bfrtip',
        buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
        language: {
          paginate: {
            first: 'Premier',
            previous: 'Précédent',
            next: 'Suivant',
            last: 'Dernier'
          },
          emptyTable: 'Aucune donnée disponible dans le tableau',
          info: 'Affichage de _START_ à _END_ sur _TOTAL_ entrées',
          infoEmpty: "Affichage de l'élément 0 à 0 sur 0 éléments",
          infoFiltered: '(filtré de _MAX_ entrées au total)',
          lengthMenu: 'Afficher _MENU_ entrées',
          search: 'Rechercher :',
          zeroRecords: 'Aucun résultat trouvé'
        }
      });
    });
  }

  editProduit(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  deleteProduit(id: number): void {
    // Assuming you have a produitService method to delete a produit
    this.produitService.deleteProduit(id).subscribe(() => {
      // After deletion, reload the list of produits
      this.loadProduits();
    });
  }
}
