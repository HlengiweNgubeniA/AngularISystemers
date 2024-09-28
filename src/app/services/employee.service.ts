import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { employeeType } from '../models/employee-type';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl  = 'https://localhost:7158/api/Employee'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  getEmployeeTypes(): Observable<employeeType[]> {
    return this.http.get<employeeType[]>(`https://localhost:7158/api/EmployeeTypes`);
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`https://localhost:7158/api/Roles`);
  }

  getEmployee(id : number): Observable<Employee> {
    return this.http.get<Employee>(`https://localhost:7158/api/Employee/${id}`);
  }
  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Employees/${id}`);
  }

  updateEmployee(empId: number, updateEmployeeVM: any): Observable<any> {
    const url=`https://localhost:7158/api/Employee/${empId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<any>(url, updateEmployeeVM,{headers});
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7158/api/Employee/${id}`);
  }


  // register(registerVM: RegisterVM): Observable<any> {
  //   console.log('register Service',registerVM);
  //   return this.http.post(`https://localhost:7158/api/Auth/Register`, registerVM);
  // }

//Register employee
registerApiUrl = 'https://localhost:7158/api/Employee/register';

registerEmployee(registrationDto: RegisterEmployeeRequestVM): Observable<OperationResult>{
  return this.http.post<OperationResult>(this.registerApiUrl, registrationDto);
}


ut = 'https://localhost:7158/api/UserType';
 getUserTypes(): Observable<any[]>{
  return this.http.get<any[]>(`${this.ut}`)
 }



}


export interface OperationResult {
  Success: boolean;
  Message: string;
}


//Register employee model
export interface RegisterEmployeeRequestVM {
 
  empFirstName: string;
  empLastName: string;
  empDOB: string; // Use ISO date format
  empGender: string;
  empAddress: string;
  empPhone: string;
  empEmail: string;
  roleId: string;
  empTypeId: number;
 
}