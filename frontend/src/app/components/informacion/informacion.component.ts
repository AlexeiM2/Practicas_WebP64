// informacion.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {
  gastos = [
    {
      "id": 1,
      "tipo": "Vivienda",
      "descripcion": "Gasto relacionado con hipoteca, alquiler y relacionados",
      "informacion_adicional": "Incluye pagos de servicios públicos como agua, electricidad y gas.",
      "path": "assets/vivienda.png"
    },
    {
      "id": 2,
      "tipo": "Salud",
      "descripcion": "Gasto relacionado gasto médicos y de salud, incluyendo seguros médicos, consultas y medicamentos",
      "informacion_adicional": "Tambien se encuentra presente gastos de odontologia o oftalmologia",
      "path": "assets/salud.png"
    },
    {
      "id": 3,
      "tipo": "Educacion",
      "descripcion": "Gasto relacionado con educación como mastriculas, pensiones",
      "informacion_adicional": "Este gasto se efectuará tambien cursos de formación y capacitaciones.",
      "path": "assets/educacion.png"
    },
    {
      "id": 4,
      "tipo": "Vestimenta",
      "descripcion": "Gasto relacionado con vestimenta como  ropa y accesorios",
      "informacion_adicional": "Cualquier tipo de vestimenta en el pais o externa",
      "path": "assets/vestimenta.jpg"
    },
    {
      "id": 5,
      "tipo": "Alimentacion",
      "descripcion": "Gasto relacionado con alimentacion",
      "informacion_adicional": "Incluye compras en supermercados y gastos en restaurantes.",
      "path": "assets/alimentacion.jpg"
    }         
  ];

  deducibles = ['Vivienda', 'Salud', 'Educacion', 'Vestimenta', 'Alimentacion'];

  constructor() {}

  ngOnInit(): void {}

  informacion(deducible: string) {
    const gasto = this.gastos.find(g => g.tipo === deducible);
    if (gasto) {
      alert('Esta es información adicional sobre ' + deducible + ': ' + gasto.informacion_adicional);
    }
  }

  borrar(deducible: string) {
    const index = this.deducibles.indexOf(deducible);
    if (index !== -1) {
      this.deducibles.splice(index, 1);
    }
  }
  descripcion(deducible: string): string {
    const gasto = this.gastos.find(g => g.tipo === deducible);
    return gasto ? gasto.descripcion : '';
  }
  
  infoAdicional(deducible: string): string {
    const gasto = this.gastos.find(g => g.tipo === deducible);
    return gasto ? gasto.informacion_adicional : '';
  }
  
  getPath(deducible: string): string {
    const gasto = this.gastos.find(g => g.tipo === deducible);
    return gasto ? gasto.path : '';
  }
}
