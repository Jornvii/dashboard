import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Data } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private empCode: string = '';

  constructor(private http: HttpClient) {}

  // Auth status observable
  authStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // Login method
  login(empCode: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { Emp_Code: empCode });
  }

  // Set employee code
  setEmpCode(empCode: string): void {
    this.empCode = empCode;
  }

  // Get employee code
  getEmpCode(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/empCode`);
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    if (typeof localStorage !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  // Register method
  register(employee: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, employee);
  }

  // Fetch get data to show suggestion PartNo when write PartNo
  Post_PartNo(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Post_PartNo`,data);
    console.log(data);
  }
 // Fetch process options based on PartNo
  Post_Process(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Post_Process`, data);
  }
   // Fetch MC options based on PartNo and Process
  GetMC(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Post_MC`, data);
  }
  Post_ToolDetial(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Post_ToolDetial`, data);
  }



  insertRows(rows: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/requestTool`, rows);
  }

 Get_ReqData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Post_Detail`, data);
  }


  // insertSelectedRows(data: any): Observable<any> {
  //   return this.http.post('/api/requestTool', data);
  // }

}
