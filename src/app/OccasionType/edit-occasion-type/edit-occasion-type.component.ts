import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OccasionType } from '../../models/occasion-type';
import { OccasionTypeService } from '../../services/occasion-type.service';

@Component({
  selector: 'app-edit-occasion-type',
  templateUrl: './edit-occasion-type.component.html',
  styleUrl: './edit-occasion-type.component.css'
})
export class EditOccasionTypeComponent {
  editForm: FormGroup;
  occasionTypeId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private occasionTypeService:  OccasionTypeService
  ) {
    this.editForm = this.fb.group({
      occasionTypeName: ['', Validators.required],
      occasionTypeDescription: [''],
    });
  }

  ngOnInit(): void {
    this.occasionTypeId = this.route.snapshot.params['id'];
    this.loadOccasionType();
  }

  loadOccasionType(): void {
    this.occasionTypeService.getOccasionType(this.occasionTypeId).subscribe(data => {
      console.log('load edit form',data);
      this.editForm.patchValue(data);
      this.editForm.patchValue({
        occasionTypeName: data.occasionTypeName,
        occasionTypeDescription: data.occasionTypeDescription,
      })
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.editForm.patchValue({ catImage: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.occasionTypeService.updateOccasionType(this.occasionTypeId, this.editForm.value).subscribe(() => {
        this.router.navigate(['/occasion-types']);
      });
    }
  }
}
