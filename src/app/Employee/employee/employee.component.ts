import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements AfterViewInit, OnInit{
  displayedColumns: string[] = ['name' ,'empFirstName', 'empLastName', 'role','type','empDOB', 'empGender', 'empAddress', 'empPhone', 'empEmail', 'actions'];
  //employees: Employee[] = [];
  dataSource = new MatTableDataSource<Employee>([]);
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort

  constructor(private dialog:MatDialog,private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {




    this.employeeService.getEmployees().subscribe(
      data => {
        this.dataSource.data = data;
        //console.log('Employess fetched successfully', data);
      },
      error => {
        console.error('Error fetching employees', error);
      }
    );
    this.loadEmployees();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }




  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.dataSource.data = data;
    });
  }



  editEmployee(employeeId: number): void {
    this.router.navigate(['/edit-employee', employeeId]);
  }

  deleteEmployee(employeeId: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(employeeId).subscribe(() => {
        this.loadEmployees();
      });
    }
  }

  openEditEmployeeModal(empId: number): void {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      width: '500px', // Set the width for the modal
      data: { empId: empId } // Pass the employee ID to the modal
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadEmployees();
      // Optionally handle any data returned when the modal is closed
    });
  }
 
  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }


  


}
