import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Role } from '../../models/role';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateRoleComponent } from '../create-role/create-role.component';
import { EditRoleComponent } from '../edit-role/edit-role.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {
  
displayedColumns: string[] = ['roleName','action'];
dataSource = new MatTableDataSource<Role>([]);

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;


constructor(private snackBar: MatSnackBar,
  private roleService: RoleService,
  public dialog: MatDialog,

){

}

ngOnInit(): void {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  this.getRoles();
}

getRoles(){
this.roleService.getRoles().subscribe((data) =>{
  this.dataSource.data = data;
})
}

applyFilter(event: Event){
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

}


onEditRole(role: any) {
  // Logic for editing the role
  this.openEditRoleModal(role);
  
}

onDeleteRole(role: any) {
  /// Logic for deleting the role
  
  //Open confirmation dialog
  const dialogRef = this.dialog.open(DeleteConfirmationComponent,{
    width: '300px',
    data: {roleName: role.roleName}
  });
  
  //After dialog is closed, check the result
  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      // User confirmed deletion
      this.roleService.deleteRole(role.id).subscribe(
        (response: any) => {
          if (response.message === 'Role assigned to a user cannot be deleted.') {
            // Show message from the API
            this.snackBar.open(response.message, '', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          } else {
            // Success case when role is deleted
            this.getRoles();
            this.snackBar.open('Role deleted successfully.', '', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          }
        },
        (error) => {
          // Handle any other errors (network/server issues)
          this.snackBar.open('Role deletion failed.', '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      );
    }
  });

  }


openCreateRoleModal(): void{
const dialogRef = this.dialog.open(CreateRoleComponent,{
  width: '400px',
});


dialogRef.afterClosed().subscribe(result => {
  if(result == true){
    
    this.roleService.getRoles().subscribe((data) =>{
      this.dataSource.data = data;
    })
  } 

})

}


openEditRoleModal(role: any): void {
  const dialogRef = this.dialog.open(EditRoleComponent, {
    width: '400px',
    data:  {role}   // passing the selected role data to the modal
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Handle successful role update (e.g., refresh roles list)
      this.roleService.getRoles().subscribe((data) =>{
        this.dataSource.data = data;
      })
    } else{

    }
  });
}


}
