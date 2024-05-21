import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private empCode: string = ''
  constructor(private http: HttpClient) { }


  //loginnnnnnnnnnnnnnnnnnnnnnnnn
  authStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  login(empCode: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { Emp_Code: empCode });
  }
  setEmpCode(empCode: string): void {
    this.empCode = empCode;
  }

  getEmpCode(): Observable<string> {
    return this.http.get<string>('api/empCode');
  }
  // isLoggedIn(): boolean {
  //   return !!localStorage.getItem('token');
  // }

  isLoggedIn(): boolean {
    if (typeof localStorage !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false;
  }
  //loginnnnnnnnnnnnnnnnnnnnnnnnn


  register(employee: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, employee);
  }
}
