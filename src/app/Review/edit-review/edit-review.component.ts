import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Review } from '../../models/review';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css']
})
export class EditReviewComponent {
  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditReviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Review,
    private fb: FormBuilder,
    private reviewService: ReviewService
  ) {
    // Initialize the form with the received data
    this.editForm = this.fb.group({
      customerName: [data.customerId, Validators.required], 
      productReviewed: [data.productId, Validators.required], 
      comment: [data.content, Validators.required],
      rating: [data.rating, [Validators.required, Validators.min(1), Validators.max(5)]],
      datePosted: [data.date, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedReview: Review = {
        ...this.data,
        ...this.editForm.value,
      };
      
      this.reviewService.updateReview(updatedReview.id, updatedReview).subscribe(() => {
        this.dialogRef.close(updatedReview);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
