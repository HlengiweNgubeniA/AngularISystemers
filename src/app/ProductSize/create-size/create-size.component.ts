import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SizeService } from '../../services/size.service';
import { Size } from '../../models/productSize';

@Component({
  selector: 'app-create-size',
  templateUrl: './create-size.component.html',
  styleUrl: './create-size.component.css'
})
export class CreateSizeComponent {
  sizeForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sizeService: SizeService
  ) {
    this.sizeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
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
        this.sizeForm.patchValue({ catImage: this.selectedImage });
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
        this.sizeForm.patchValue({ catImage: this.selectedImage });
      };
      reader.readAsDataURL(file);
    }
  }


  onSubmit(): void {
    if (this.sizeForm.valid) {
      const newSize: Size = this.sizeForm.value;
      console.log('New size', newSize);
      this.sizeService.createSize(newSize).subscribe({
        next:(value) => {
          console.log('Size created successfully', value);
        },
        complete:() => {
        this.router.navigate(['/sizes']);
        },
        error:(err) => {
          console.error('Error creating size', err);
        },
      }
       
      );
    }
  } 
}
