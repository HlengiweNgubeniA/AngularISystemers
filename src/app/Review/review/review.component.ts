import { Component, Input, OnInit} from '@angular/core';
import { Review } from '../../models/review';
import { ReviewService } from '../../services/review.service';
import { Router } from '@angular/router';
import { CreateReviewComponent } from '../../Review/create-review/create-review.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EditReviewComponent } from '../edit-review/edit-review.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Number } from 'twilio/lib/twiml/VoiceResponse';
import { raceWith } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

 


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit{
  // reviews: Review[] = [];
  productId!: number
  reviews: any[] = [];

  constructor(private dialog: MatDialog,private reviewService: ReviewService, private router: Router, private route: ActivatedRoute,
   private fb: FormBuilder, private authservice: AuthService,
  ) {
    
  }

  ngOnInit(): void {
    
   this.route.paramMap.subscribe(params => {
   const id = params.get('id');
 if(id){
  this.productId = +id;
  this.fetchReviews(this.productId)
 } else {
  console.error('Product ID is null or undefined.');
 }
   })
  // console.log('ProductId',this.productId)
}

goBack(): void {
  // Add your navigation logic here, e.g., this.router.navigate(['/products']);
}

fetchReviews(productId: number){
  this.reviewService.getReviewsByProductId(productId).subscribe(
    {
      next: (data) => {
        console.log('',data)
        this.reviews = data;
        
      }
    }
  )
}


  loadReviews(): void {
    this.reviewService.getReviews().subscribe((data: Review[]) => {
      this.reviews = data;
    });
  }

  editReview(reviewId: number): void {
    this.router.navigate(['/edit-review', reviewId]);
  }

  deleteReview(reviewId: number): void {
    if (confirm('Are you sure you want to delete this review?')) {
      this.reviewService.deleteReview(reviewId).subscribe(() => {
        this.loadReviews();
      });
    }
  }


openReviewDialog(){
  const dialogRef = this.dialog.open(CreateReviewComponent,{
    data: {productId: this.productId},
    width: '400px'
  });


  dialogRef.afterClosed().subscribe(result => {
  if(result){
    console.log('Review data:', result);
  }
    this.loadReviews();
  })
}


getStars(rating: number): number[] {
  return [1,2,3,4,5];
}

back(){
  this.router.navigate(['/Shop'])
}




}

