import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Help } from '../../models/help';
import { ThisHelpService } from '../../services/this-help.service';

@Component({
  selector: 'app-edit-help',
  templateUrl: './edit-help.component.html',
  styleUrl: './edit-help.component.css'
})
export class EditHelpComponent {
  editForm: FormGroup;
  helpId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private helpService:  ThisHelpService
  ) {
    this.editForm = this.fb.group({
      helpTitle: ['', Validators.required],
      content: [''],
      keywords: [''],
      author: ['', Validators.required],
      format: ['',],
      feedback: ['',],
      supportContact: ['', Validators.required],
      lastUpdate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.helpId = this.route.snapshot.params['id'];
    this.loadHelp();
  }

  loadHelp(): void {
    this.helpService.getHelp(this.helpId).subscribe(data => {
      console.log('load edit form',data);
      this.editForm.patchValue(data);
      this.editForm.patchValue({
        lastUpdate: new Date(data.lastUpdate),
        content: new Date(data.content),
        keywords: data.keywords,
        author: data.author,
        supportContact: data.supportContact
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
      this.helpService.updateHelp(this.helpId, this.editForm.value).subscribe(() => {
        this.router.navigate(['/help']);
      });
    }
  }
}