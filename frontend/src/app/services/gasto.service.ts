import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs'; // Importar Observable
import { Gasto } from '../models/Gasto'; // Importar Gasto
@Injectable({
  providedIn: 'root'
})
export class GastoService {

  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient, private authService: AuthService) { }

  agregarGasto(gasto: { tipo: string; ruc: string; valor: number }) {
    const token = this.authService.getToken(); // Obtener el token del servicio AuthService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Establecer el encabezado de autorización

    return this.http.post<any>(`${this.URL}/gasto`, gasto, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  obtenerGastos(): Observable<Gasto[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Gasto[]>(`${this.URL}/gastos`, { headers });
  }

  private handleError(error: any) {
    console.error('Error occurred:', error);
    return throwError(error);
  }
}
