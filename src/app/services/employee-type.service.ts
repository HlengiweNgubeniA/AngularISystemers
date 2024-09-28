import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { employeeType } from '../models/employee-type';
import { catchError } from 'rxjs';

export interface employeeTypeVM
{
  empTypeId: number;
  name: string;
  description: string;
}




@Injectable({
  providedIn: 'root'
})
export class EmployeeTypeService {

  private apiUrl  = 'https://localhost:7158/api/EmployeeTypes'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  getEmployeeType(id : number): Observable<employeeType> {
    return this.http.get<employeeType>(`https://localhost:7158/api/EmployeeTypes/${id}`);
  }
  getEmployeeTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  //Getting employee type by ID
  private url = 'https://localhost:7158/api/EmployeeTypes';
  getEmployeeTypeById(empTypeId: number): Observable<employeeTypeVM> {
    return this.http.get<employeeTypeVM>(`${this.url}/${empTypeId}`).pipe(catchError(this.handleError));
  }

 // Error handling method
 private handleError(error: HttpErrorResponse): Observable<never> {
  console.error('An error occurred:', error); // Log the error to the console
  return throwError('Something went wrong; please try again later.');
}

//-----------------------------------//

  

  createEmployeeType(employeeType: any): Observable<any> {
    return this.http.post<any>(`https://localhost:7158/api/EmployeeTypes`, employeeType);
  }

  updateEmployeeType(id: number, employeeType: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7158/api/EmployeeTypes/${id}`, employeeType);
  }

  deleteEmployeeType(id: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7158/api/EmployeeTypes/${id}`)
  }
}

