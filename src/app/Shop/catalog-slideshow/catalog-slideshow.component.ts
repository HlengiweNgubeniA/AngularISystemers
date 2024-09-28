import { Component, OnInit, Input} from '@angular/core';
import { SpecialOccasionCatalogue } from '../../models/special-occasion-catalogue';
import { SpecialOccasionCatalogueService } from '../../services/special-occasion-catalogue.service';
import { OccasionType } from '../../models/occasion-type';
import { Discount } from '../../models/discount';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';


@Component({
  selector: 'app-catalog-slideshow',
  templateUrl: './catalog-slideshow.component.html',
  styleUrl: './catalog-slideshow.component.css'
})
export class CatalogSlideshowComponent implements OnInit {
  catalog: SpecialOccasionCatalogue[] = [];
  occasionTypes: OccasionType[] = [];
  discounts: Discount[] = [];

  dataSource = new MatTableDataSource<SpecialOccasionCatalogue>([]);
  
  @Input() catalogues: SpecialOccasionCatalogue[] = [];

currentIndex: number = 0;

images: SpecialOccasionCatalogue[] = [];

constructor(
  private catService: SpecialOccasionCatalogueService,
  private snackBar: MatSnackBar,
  private router: Router,
){}

ngOnInit(): void {
  this.catService.getCatalogues().subscribe(
    (data) => {
      this.catalogues = data;
      this.catalog = data;
    }
  );

  this.catService.getOccasionTypes().subscribe(data => {
    this.occasionTypes = data;
    //this.loadCatalogues(); // Load catalogues after occasion types
  });

  this.catService.getDiscounts().subscribe(data => {
    this.discounts = data;
    //this.loadCatalogues(); // Load catalogues after discounts
  });

  this.startSlideshow();


}

startSlideshow() {
  setInterval(() => {
    this.nextSlide();
  }, 3000); // Change slide every 3 seconds
}

nextSlide() {
  this.currentIndex = (this.currentIndex + 1) % this.catalogues.length;
}

prevSlide() {
  this.currentIndex = (this.currentIndex - 1 + this.catalogues.length) % this.images.length;
}

setCurrentIndex(index: number) {
  this.currentIndex = index;
}


loadCatalogues(): void {
  this.catService.getCatalogues().subscribe(
    (data: SpecialOccasionCatalogue[]) => {
      this.catalogues = data.map(catalogue => {
        const occasionTypeName = this.occasionTypes.find(o => o.occasionTypeId === catalogue.occasionTypeId)?.occasionTypeName || 'Unknown';
        const discountName = this.discounts.find(d => d.discountId === catalogue.discountId)?.disName || 'No Discount';
        
        return {
          ...catalogue,
          occasionTypeName,
          discountName
        };
      });

      this.dataSource.data = this.catalogues; // Populate dataSource with mapped data
     // console.log('Catalogues fetched successfully', this.catalogues);
 if(this.catalogues.length > 1)
{
   this.startSlideshow();
 } else {
   this.currentIndex = 0;
}


    },
    error => {
      console.error('Error fetching catalogues', error);
      this.snackBar.open('Failed to load catalogues', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['error-snackbar']
      });
    }
  ); 
}

onSlideTap(event: MouseEvent){
  const slideContainer = event.currentTarget as HTMLElement;
  const taoposition = event.clientX - slideContainer.getBoundingClientRect().left;
  const halfWidth = slideContainer.offsetHeight / 2;


  if(taoposition < halfWidth){
    this.prevSlide();
  } else{
    this.nextSlide()
  }
}

navigateToCatalog(event: MouseEvent){
  event.stopPropagation();
  this.router.navigate(['/Catalogues'])
}

}
