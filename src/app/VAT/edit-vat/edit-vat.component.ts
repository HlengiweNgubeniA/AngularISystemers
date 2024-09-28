import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VAT } from '../../models/vat';
import { VATService } from '../../services/vat.service';
import { AuthService } from '../../services/auth.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-vat',
  templateUrl: './edit-vat.component.html',
  styleUrl: './edit-vat.component.css'
})
export class EditVatComponent {
  editForm: FormGroup;
  vat: VAT = {
    id: 0,
    percentage: 0,
    user: ''
  }
user!: string;
id!: number;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private vatService: VATService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditVatComponent>,
  ) {
    this.editForm = this.fb.group({
      percentage: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    //this.vatId = this.route.snapshot.params['id'];
    this.id = this.data.vat.id;
    this.user = this.authService.getUserProfile() || '';
    //console.log('Form Data:', this.id);
  }

  

 

  onSubmit(): void {
    if (this.editForm.valid) {
      //const user = this.authService.getUserProfile() || '';
      const formData = {
        percentage: this.editForm.value.percentage,
        user: this.authService.getUserProfile() || ''
       //id: this.data.vat.id
      }
      console.log('Form Data:', formData);

     // console.log('Vat ID:', this.data.vat.id);
     const vatId = this.id;
      if(vatId){

        this.vatService.updateVat(vatId, formData).subscribe(() => {
          this.dialogRef.close(true);
        }, (error) => {
          console.error('Error updating VAT:', error);  // Log error if something goes wrong
        });
      } else {
        console.error('VAT ID is undefined or invalid.');
      }

      }

      //console.log('vatttt',this.data.vat.id)
     
  }

  cancel(){
    this.closeModal();
  };


 
  closeModal(): void{
    this.dialogRef.close(false)
  }

}
