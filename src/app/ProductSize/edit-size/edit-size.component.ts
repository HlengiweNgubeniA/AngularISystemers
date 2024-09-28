import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Size } from '../../models/productSize';
import { SizeService } from '../../services/size.service';

@Component({
  selector: 'app-edit-size',
  templateUrl: './edit-size.component.html',
  styleUrl: './edit-size.component.css'
})
export class EditSizeComponent {
  editForm: FormGroup;
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private sizeService:  SizeService
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadSize();
  }

  loadSize(): void {
    this.sizeService.getSize(this.id).subscribe(data => {
      console.log('load edit form',data);
      this.editForm.patchValue(data);
      this.editForm.patchValue({
        name: data.name,
        description: data.description,
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
      this.sizeService.updateSize(this.id, this.editForm.value).subscribe(() => {
        this.router.navigate(['/sizes']);
      });
    }
  }
}
