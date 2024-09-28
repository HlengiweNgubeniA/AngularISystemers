import { Component, OnInit, ViewChild } from '@angular/core';
import { UserProfileService, User, UserRoleUpdateVM} from '../../services/user-profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
//import { UpdateRoleComponent } from '../update-role/update-role.component';
import { MatDialog } from '@angular/material/dialog';
//import { UnassignRoleComponent } from '../unassign-role/unassign-role.component';
import { UpdateRoleComponent } from '../update-role/update-role.component';
import { UnAssignRoleComponent } from '../un-assign-role/un-assign-role.component';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  displayedColumns: string[] = [ 'name', 'email', 'role', 'actions'];

  dataSource = new MatTableDataSource<User>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient,private dialog: MatDialog,private router: Router, private snackBar: MatSnackBar, private catService: UserProfileService) {}


  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadUsers(): void {
    this.catService.getAllUsers().subscribe(
      (data: User[]) => {
        this.dataSource.data = data;
      },
      (error) => {
        this.snackBar.open('Failed to load catalogues', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['error-snackbar']
        });
      }
    );
  }

  applyFilter(event: Event): void {
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }  

 
  

  // Method to open the role update modal
openRoleUpdateModal(email: string, newRole:string): void {
  const dialogRef = this.dialog.open(UpdateRoleComponent, {
    width: '300px',
    data: { email, currentRole: newRole },
  });

  

  dialogRef.afterClosed().subscribe(result => {
    if (result) {

this.catService.getAllUsers().subscribe((data)=>{
this.dataSource.data = data;
})

    }
    
  });
}


openConfirmDialog(email: string, role: string, userId: string): void {
  const dialogRef = this.dialog.open(UnAssignRoleComponent, {
    data: { email, role, id:userId},
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
     this.unassignRole(userId);
     console.log('user Id sent',userId)
    }
  }); 
}

unassignRole(userId: string): void {
  this.catService.unassignRole(userId).subscribe(
    (response) => {
      console.log('Role unassigned successfully');
      // Optionally, you can show a success message or refresh the data
    
      this.snackBar.open('Role unassigned successfully', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      this.loadUsers()
   
    
    },
    (error) => {
      console.log('Id recieved in the unassign method', userId)
      console.error('Error while unassigning role:', error); 
  this.snackBar.open('Failed to unassign role', '', {
    duration: 3000,
    verticalPosition: 'top',
    horizontalPosition: 'right',
  });

    }
  );
}



deleteUser(id: string){
  if(confirm('Are you sure you want to delete this user?')){
    this.http.delete(`https://localhost:7158/api/Auth/${id}`).subscribe(
      () => {
        this.snackBar.open('User deleted successfully.','',{
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        })
        this.loadUsers();
      }, error => {
        console.log('UserId',id)
        this.snackBar.open('Failed delete user.','',{
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        })
      }
    )
  }
}



}
