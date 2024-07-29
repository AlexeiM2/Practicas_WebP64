import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private URL = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  getTasks(){
     return this.http.get<any>(this.URL+'/task');
  }

  getPrivateTasks(){
    return this.http.get<any>(this.URL+'/private-task');
 }
 /*createGasto(gasto: { tipo: string; ruc: string; valor: number }) {
  return this.http.post<any>(`${this.URL}/gasto`, gasto, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
}

getReporte() {
  return this.http.get<any>(`${this.URL}/reporte`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
}*/
}
