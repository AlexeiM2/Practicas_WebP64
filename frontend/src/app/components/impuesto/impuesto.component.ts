import { Component } from '@angular/core';
import { GastoService } from '../../services/gasto.service';
import { Gasto } from '../../models/Gasto';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-impuesto',
  templateUrl: './impuesto.component.html',
  styleUrls: ['./impuesto.component.css']
})

export class ImpuestoComponent {
  ruc: string = '';
  valor: number | null = null;
  tipo: string = 'Impuesto';
  cedula: string = '';
  sueldo: number = 0;
  deduccionVivienda: number = 0;
  deduccionEducacion: number = 0;
  deduccionVestimenta: number = 0;
  deduccionAlimentacion: number = 0;
  deduccionSalud: number = 0;
  deducciones: number = 0;
  fraccionBasica: number = 0;
  porcentajeExcedente: number = 0;
  impuestoFraccionBasica: number = 0;
  impuestoJSON: string = '';
  renta_calculada: string = '';
  valor_excedente: number = 0;
  maximos = {
    'Salud': 15238.60,
    'Vivienda': 3809.65,
    'Educacion': 3809.65,
    'Alimentacion': 3809.65,
    'Vestimenta': 3809.65
  };

  constructor(private gastoService: GastoService) {}

  Calcular() {
    if (this.deduccionVivienda > this.maximos['Vivienda']) {
      alert(`El valor máximo para Vivienda es ${this.maximos['Vivienda']}`);
      return;
    }
    if (this.deduccionEducacion > this.maximos['Educacion']) {
      alert(`El valor máximo para Educación es ${this.maximos['Educacion']}`);
      return;
    }
    if (this.deduccionVestimenta > this.maximos['Vestimenta']) {
      alert(`El valor máximo para Vestimenta es ${this.maximos['Vestimenta']}`);
      return;
    }
    if (this.deduccionAlimentacion > this.maximos['Alimentacion']) {
      alert(`El valor máximo para Alimentación es ${this.maximos['Alimentacion']}`);
      return;
    }
    if (this.deduccionSalud > this.maximos['Salud']) {
      alert(`El valor máximo para Salud es ${this.maximos['Salud']}`);
      return;
    }
    this.deducciones= this.deduccionVivienda + this.deduccionEducacion + this.deduccionVestimenta + this.deduccionAlimentacion + this.deduccionSalud;
    if (this.deducciones > 15238.60){
      this.deduccionVivienda = 0;
      this.deduccionEducacion = 0;
      this.deduccionVestimenta = 0;
      this.deduccionAlimentacion = 0;
      this.deduccionSalud = 0;
      alert('Las deducciones superan el límite de 15238.60');
      return;
    } else if (this.deduccionVivienda < 0 || this.deduccionEducacion < 0 || this.deduccionVestimenta < 0 || this.deduccionAlimentacion < 0 || this.deduccionSalud < 0) {
      this.deduccionVivienda = 0;
      this.deduccionEducacion = 0;
      this.deduccionVestimenta = 0;
      this.deduccionAlimentacion = 0;
      this.deduccionSalud = 0;
      alert('Las deducciones no deben ser inferiores a 0');
      return;
    }

    const baseImponible = this.sueldo - this.deducciones;
    this.calcularPorcentaje(baseImponible);

    const excedente = this.calcularExcedente(baseImponible);
    const impuestoRenta = this.calcularImpuestoRenta(excedente);

    this.valor = impuestoRenta;

    const impuesto = {
      cedula: this.cedula,
      sueldo: this.sueldo,
      deducciones: this.deducciones,
      baseImponible: baseImponible,
      excedente: excedente,
      impuestoRenta: impuestoRenta
    };

    const userId: string | null = localStorage.getItem('userId'); // Obtener userId del localStorage


    const factura: Gasto = {
      tipo: this.tipo,
      ruc: this.cedula,
      valor: impuesto.impuestoRenta,
      userId: userId || '' 
    };

    this.impuestoJSON = JSON.stringify(impuesto);
    this.renta_calculada = impuesto.impuestoRenta.toString();
    this.gastoService.agregarGasto(factura).subscribe(
      response => {
        console.log('Gasto agregado:', response);
        alert('Gasto agregado correctamente');
      },
      error => {
        console.error('Error al agregar gasto:', error);
        alert('Error al agregar gasto');
      }
    );
    console.log('Impuesto en formato JSON:', factura);
  }

  calcularPorcentaje(baseImponible: number): void {
    if (baseImponible >= 0 && baseImponible <= 11722) {
      this.fraccionBasica = 0;
      this.impuestoFraccionBasica = 0;
      this.porcentajeExcedente = 0;
    } else if (baseImponible >= 11723 && baseImponible <= 14930) {
      this.fraccionBasica = 11722;
      this.impuestoFraccionBasica = 0;
      this.porcentajeExcedente = 0.05;
    } else if (baseImponible >= 14931 && baseImponible <= 19385) {
      this.fraccionBasica = 14930;
      this.impuestoFraccionBasica = 160;
      this.porcentajeExcedente = 0.10;
    } else if (baseImponible >= 19386 && baseImponible <= 25638) {
      this.fraccionBasica = 19385;
      this.impuestoFraccionBasica = 606;
      this.porcentajeExcedente = 0.12;
    } else if (baseImponible >= 25639 && baseImponible <= 33738) {
      this.fraccionBasica = 25638;
      this.impuestoFraccionBasica = 1356;
      this.porcentajeExcedente = 0.15;
    } else if (baseImponible >= 33739 && baseImponible <= 44721) {
      this.fraccionBasica = 33738;
      this.impuestoFraccionBasica = 2571;
      this.porcentajeExcedente = 0.20;
    } else if (baseImponible >= 44722 && baseImponible <= 59537) {
      this.fraccionBasica = 44721;
      this.impuestoFraccionBasica = 4768;
      this.porcentajeExcedente = 0.25;
    } else if (baseImponible >= 59538 && baseImponible <= 79388) {
      this.fraccionBasica = 59537;
      this.impuestoFraccionBasica = 8472;
      this.porcentajeExcedente = 0.30;
    } else if (baseImponible >= 79389 && baseImponible <= 105580) {
      this.fraccionBasica = 79388;
      this.impuestoFraccionBasica = 14427;
      this.porcentajeExcedente = 0.35;
    } else if (baseImponible >= 105581) {
      this.fraccionBasica = 105580;
      this.impuestoFraccionBasica = 23594;
      this.porcentajeExcedente = 0.37;
    }
    console.log('porcentaje: ', this.porcentajeExcedente);
  }

  calcularExcedente(baseImponible: number): number {
    return baseImponible - this.fraccionBasica;
  }

  calcularImpuestoRenta(excedente: number): number {
    if (excedente < 0) {
      return 0;
    }
    this.valor_excedente = this.impuestoFraccionBasica + (excedente * this.porcentajeExcedente);
    console.log('Impuesto a la renta es de:', this.valor_excedente);
    return this.valor_excedente;
  }
}
