import { Component } from '@angular/core';
import { Help } from '../../models/help';
import { ThisHelpService } from '../../services/this-help.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-this-help',
  templateUrl: './this-help.component.html',
  styleUrl: './this-help.component.css'
})
export class ThisHelpComponent {
  helps: Help[] = [];

  constructor(private helpService: ThisHelpService, private router: Router) {}

  ngOnInit(): void {
    this.helpService.getHelps().subscribe(
      data => {
        this.helps = data;
        console.log('All types of help are displayed', data);
      },
      error => {
        console.error('Error getting you help', error);
      }
    );
  }
  loadHelps(): void {
    this.helpService.getHelps().subscribe(data => {
      this.helps = data;
    });
  }


  editHelp(helpId: number): void {
    this.router.navigate(['/edit-help', helpId]);
  }

  //deleteCatalogue(catalogueId: number): void {
   // if (confirm('Are you sure you want to delete this catalogue?')) {
    //  this.catalogueService.deleteCatalogue(catalogueId).subscribe(() => {
  //      this.loadCatalogues();
   //   });
  //  }
 // }
}

