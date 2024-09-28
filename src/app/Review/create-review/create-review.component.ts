import { Component, Inject} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../models/review';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrl: './create-review.component.css'
})
export class CreateReviewComponent {

//_______Thuso_________//
review = {
  reviewText: '',
  rating: 0,
  comment: '',
}

stars: number[] =[1,2,3,4,5]
//_____________________//


  reviewForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private dialogref: MatDialogRef<CreateReviewComponent>,
    @Inject(MAT_DIALOG_DATA) public product: any,
    private fb: FormBuilder,
    private router: Router,
    private reviewService: ReviewService
  ) {
    this.reviewForm = this.fb.group({
      customerName: [''],
      productReviewed: ['', Validators.required],
      rating: ['', Validators.required],
      comment: [''],
      datePosted: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

 //____________Thuso_______//
submitReview(){
  this.reviewService.createReview(this.review).subscribe(() => {
    this.dialogref.close();
  });
}



setRating(rating: number){
  this.review.rating = rating;
}

 //________________________//

  

  onSubmit(): void {
    if (this.reviewForm.valid) {
      const newReview: Review = this.reviewForm.value;
      console.log('New review', newReview);
      this.reviewService.createReview(newReview).subscribe({
        next:(value) => {
          console.log('Review created successfully', value);
        },
        complete:() => {
        this.router.navigate(['/reviews']);
        },
        error:(err) => {
          console.error('Error creating a new review', err);
        },
      }
       
      );
    }
  } 


close(){
  
}

}
