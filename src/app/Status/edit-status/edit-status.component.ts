import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from '../../models/status';
import { StatusService } from '../../services/status.service';

@Component({
  selector: 'app-edit-status',
  templateUrl: './edit-status.component.html',
  styleUrl: './edit-status.component.css'
})
export class EditStatusComponent {
  editForm: FormGroup;
  statusId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private statusService:  StatusService
  ) {
    this.editForm = this.fb.group({
      statusName: ['', Validators.required],
      statusDescription: [''],
    });
  }

  ngOnInit(): void {
    this.statusId = this.route.snapshot.params['id'];
    this.loadStatus();
  }

  loadStatus(): void {
    this.statusService.getStatus(this.statusId).subscribe(data => {
      console.log('load edit form',data);
      this.editForm.patchValue(data);
      this.editForm.patchValue({
        statusName: data.statusName,
        statusDescription: data.statusDescription
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
      this.statusService.updateStatus(this.statusId, this.editForm.value).subscribe(() => {
        this.router.navigate(['/statuses']);
      });
    }
  }
}
