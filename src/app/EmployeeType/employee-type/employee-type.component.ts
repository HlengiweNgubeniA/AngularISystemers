import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { employeeType } from '../../models/employee-type';
import { EmployeeTypeService } from '../../services/employee-type.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditEmployeeTypeComponent } from '../edit-employee-type/edit-employee-type.component';
import { MatDialog } from '@angular/material/dialog';
import { EmpTypeDeletionConfirmationComponent } from '../emp-type-deletion-confirmation/emp-type-deletion-confirmation.component';



@Component({
  selector: 'app-employee-type',
  templateUrl: './employee-type.component.html',
  styleUrl: './employee-type.component.css'
})
export class EmployeeTypeComponent {
  //employeeTypes: employeeType[] = [];
  displayedColumns: string[] = ['name','description','action'];
  dataSource = new MatTableDataSource<employeeType>([])

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  


  constructor(private employeeTypeService: EmployeeTypeService, 
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,

  ) {}

  ngOnInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


    this.employeeTypeService.getEmployeeTypes().subscribe(
      data => {
        this.dataSource.data = data;
      //  console.log('Employee types fetched successfully', data);
      },
      error => {
       // console.error('Error fetching employee types', error);
      }
    );
  }



  loadEmployeeTypes(): void {
    this.employeeTypeService.getEmployeeTypes().subscribe(data => {
      this.dataSource.data = data;
    });
  } 

  editEmployeeType(employeeTypeId: number): void {
    this.router.navigate(['/edit-employee-type', employeeTypeId]);
  }

  deleteEmployeeType(employeeTypeId: number, name: string): void {
   // console.log('Attempting to delete:', employeeTypeId, name); // Add this line
    const dialogRef = this.dialog.open(EmpTypeDeletionConfirmationComponent, {
      data: {
        message: `Are you sure you want to delete this employee type: <strong>${name}</strong>?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeTypeService.deleteEmployeeType(employeeTypeId).subscribe({
          next: () => {
            
            this.loadEmployeeTypes(); // Refresh the list
          },
          error: (error) => {
            if (error.status === 400) {
              this.snackBar.open(`Deletion failed. ${error.error}`, '', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
              });
              
            } if(error.status === 200){
              this.snackBar.open(`Employee type: ${name.toUpperCase()} deleted.`, '', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
              });
              this.loadEmployeeTypes();
            }
          }
        });
      }
    });
  }



  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
  }


  onEditType(type: any) {
    // Logic for editing the role
    this.openEditModal(type);
    
  }
 
  openEditModal(type: any): void {
    const dialogRef = this.dialog.open(EditEmployeeTypeComponent, {
      width: '400px',
      data:  {id: type.employeeTypeId,
        typeName: type.name,
         typeDes: type.description}   // passing the selected role data to the modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle successful role update (e.g., refresh roles list)
        this.employeeTypeService.getEmployeeTypes().subscribe((data) =>{
          this.dataSource.data = data;
        })
      } 
    });
  }

}