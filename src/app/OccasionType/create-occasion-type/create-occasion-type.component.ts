import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OccasionTypeService } from '../../services/occasion-type.service';
import { OccasionType } from '../../models/occasion-type';

@Component({
  selector: 'app-create-occasion-type',
  templateUrl: './create-occasion-type.component.html',
  styleUrl: './create-occasion-type.component.css'
})
export class CreateOccasionTypeComponent {
  occasionTypeForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private occasionTypeService: OccasionTypeService
  ) {
    this.occasionTypeForm = this.fb.group({
      occasionTypeId: ['',],
      occasionTypeName: ['', Validators.required],
      occasionTypeDescription: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.occasionTypeForm.patchValue({ catImage: this.selectedImage });
      };
      reader.readAsDataURL(file);
    }
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.occasionTypeForm.patchValue({ catImage: this.selectedImage });
      };
      reader.readAsDataURL(file);
    }
  }


  onSubmit(): void {
    if (this.occasionTypeForm.valid) {
      const newOccasionType: OccasionType = this.occasionTypeForm.value;
      console.log('New occasion type', newOccasionType);
      this.occasionTypeService.createOccasionType(newOccasionType).subscribe({
        next:(value) => {
          console.log('Occasion type created successfully', value);
        },
        complete:() => {
        this.router.navigate(['/occasion-types']);
        },
        error:(err) => {
          console.error('Error creating occasion type', err);
        },
      }
       
      );
    }
  } 
}
