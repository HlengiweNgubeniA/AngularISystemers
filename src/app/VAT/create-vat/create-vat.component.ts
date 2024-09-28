import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VATService } from '../../services/vat.service';
import { VAT } from '../../models/vat';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-vat',
  templateUrl: './create-vat.component.html',
  styleUrl: './create-vat.component.css'
})
export class CreateVatComponent {
  VatForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private vatService: VATService,
    private snackBar: MatSnackBar,
    private authservice: AuthService
  ) {
    this.VatForm = this.fb.group({

      percentage: ['', Validators.required]

    });
  }

  ngOnInit(): void {

const user = this.authservice.getUserProfile() || '';


  }

 



  onSubmit(): void {
    if (this.VatForm.valid) {
     // const newVat: VAT = this.VatForm.value;

      const formData = {
        percentage: this.VatForm.value.percentage,
        user: this.authservice.getUserProfile() || ''
      }

      //console.log('New VAT', formData);
      this.vatService.createVat(formData).subscribe({
        next:(value) => {
          
        },
        complete:() => {
          this.snackBar.open('Vat added.','',{
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          })
        this.router.navigate(['admin/vats']);
        },
        error:(error) => {
          if(error.status === 409){
            this.snackBar.open('Vat record already exists.Only one vat % is applicaple at a time, consider updating the vat value.','',{
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
            this.router.navigate(['admin/vats']);
          }
        },
      }
       
      );
    }
  } 

  cancel(){
    this.router.navigate(['admin/vats']);
  };

}
