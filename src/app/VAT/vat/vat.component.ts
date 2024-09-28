import { Component, OnInit } from '@angular/core';
import { VAT } from '../../models/vat';
import { VATService } from '../../services/vat.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { EditVatComponent } from '../edit-vat/edit-vat.component';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-vat',
  templateUrl: './vat.component.html',
  styleUrl: './vat.component.css'
})
export class VatComponent implements OnInit {
  vat: VAT[] = [];
  displayedColumns: string[] = [ 'percentage','status','actions'];



  constructor(private  authService: AuthService,private snackBar: MatSnackBar,private Service: VATService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
  this.GetVat()
  }


GetVat()
{
  this.Service.getVat().subscribe(
    data => {
      this.vat = data;
     // console.log('VAt fetched successfully', data);
    },
    error => {
     // console.error('Error fetching VATs', error);
    }
  );
}



  loadVats(): void {
    this.Service.getVat().subscribe(data => {
      this.vat = data;
    });
  }

  editVAT(vatId: number): void {
    this.router.navigate(['/edit-vat', vatId]);
  }

  

  deleteVat(vatId: number): void {
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open('Are you sure you want to delete this VAT?', 'Yes', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  
    const user = this.authService.getUserProfile() || '';
  
    snackBarRef.onAction().subscribe(() => {
      this.Service.deleteVat(vatId, user).subscribe({
        next: () => {
          // Success case: VAT deleted
          this.loadVats(); // Reload VATs after deletion
          this.snackBar.open('VAT deleted successfully', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        },
        error: (errorResponse: HttpErrorResponse) => {
          // Error case: Handle the different error scenarios
          let errorMessage = 'An error occurred. Please try again.';
  
          // Handle specific HTTP status codes
          if (errorResponse.status === 404) {
            errorMessage = 'VAT not found or already deleted.';
            console.log('404',errorMessage)
          } else if (errorResponse.status === 400) {
            errorMessage = 'Bad request. Please check your input.';
            console.log('400',errorMessage)
          } else if (errorResponse.status === 500) {
            errorMessage = 'Internal server error. Please contact support.';
            console.log('500',errorMessage)
          }
  
          // Show error message in a snackbar
          this.snackBar.open(errorMessage, 'Close', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          }); console.log(errorMessage)
        },
      });
    });
  
    snackBarRef.afterDismissed().subscribe(info => {
      if (!info.dismissedByAction) {
        this.snackBar.open('Deletion cancelled', 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    });
  }
  

  openEditDialog(vat: any): void {
    const dialogRef = this.dialog.open(EditVatComponent, {
      width: '400px',
      height: '400px',
      data: { vat: vat} // Pass data to the dialog
    });

    //console.log('Vat', vat)

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     // Handle save result
    //     this.Service.updateVat(result.id, result).subscribe(() => {
    //       this.loadVats(); // Reload roles after update
    //       this.snackBar.open('Vat % updated.','',{
    //         duration: 3000,
    //         verticalPosition: 'top',
    //         horizontalPosition: 'center'
    //       });
    //     }, error => {
    //       this.snackBar.open('Failed to update vat %','',{
    //         duration: 3000,
    //         verticalPosition: 'top',
    //         horizontalPosition: 'center'
    //       });
    //     });
    //   }
    //}); 
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadVats();
          // Handle save result
          this.Service.updateVat(result.id, result).subscribe(() => {
              this.loadVats(); // Reload VATs after update
              this.snackBar.open('VAT % updated.', '', {
                  duration: 3000,
                  verticalPosition: 'top',
                  horizontalPosition: 'center'
              });
          }, error => {
              let message = 'Failed to update VAT %';
              if (error.status === 404) {
                  message = 'VAT not found.';
              } else if (error.status === 400) {
                  message = 'Invalid data provided.';
              } else if (error.status === 500) {
                  message = 'Internal server error. Please try again later.';
              }
              this.snackBar.open(message, '', {
                  duration: 3000,
                  verticalPosition: 'top',
                  horizontalPosition: 'center'
              });
          });
      }
  });
   
  }



}
