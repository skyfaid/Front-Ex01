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
        dom: '<"top"lfB>rt<"bottom"ip><"clear">', // Adjusted DOM structure to include top and bottom sections
        buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
        lengthMenu: [10, 25, 50, 100], // Define the options for entries per page
        language: {
          paginate: {
            first: 'Premier',
            previous: '<i class="fas fa-arrow-left"></i>',
            next: '<i class="fas fa-arrow-right"></i>',
            last: 'Dernier'
          },
         
          info: "Affichage de l'élément _START_ à _END_ sur _TOTAL_ éléments",
        
          infoFiltered: '(filtré de _MAX_ entrées au total)',
          lengthMenu: 'Afficher _MENU_ entrées',
          search: 'Rechercher : ',
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

  
  // Method to handle changing entries per page
  changeEntriesPerPage(value: number): void {
    $('#produitTable').DataTable().page.len(value).draw();
  }
}
