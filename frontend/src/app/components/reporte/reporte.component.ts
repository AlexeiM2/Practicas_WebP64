import { Component, OnInit } from '@angular/core';
import { GastoService } from '../..//services/gasto.service';
import { Gasto } from '../../models/Gasto'; // Importar Gasto

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})

export class ReporteComponent implements OnInit {
  gastos: Gasto[] = [];

  constructor(private gastoService: GastoService) {}

  ngOnInit(): void {
    this.cargarGastos();
  }

  cargarGastos(): void {
    this.gastoService.obtenerGastos().subscribe(
      data => {
        this.gastos = data;
      },
      error => {
        console.error('Error al cargar gastos:', error);
      }
    );
  }
}