import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public PrecioUnitario: string;
  public Cantidad: string;
  public focusOnPrecio: boolean;
  public Total: number;
  public Valores: number[];
  public claseCantidad: string;
  public clasePrecio: string;
  constructor(private _snackBar: MatSnackBar) {
    this.focusOnPrecio = false;
    this.PrecioUnitario = '0.00';
    this.Cantidad = '0';
    this.Total = 0;
    this.Valores = [];
    this.claseCantidad = 'visor-selected';
  }

  addToValue(valor: string) {
    if (this.focusOnPrecio) {
      let v = this.PrecioUnitario.replace('.', '');
      v = v.substr(0);
      v += valor;
      const l = v.length;
      this.PrecioUnitario = v.substr(0, l - 2) + '.' + v.substr(l - 2);
    } else {
      if (this.Cantidad === '0') {
        this.Cantidad = '' + valor;
      } else {
        this.Cantidad += '' + valor;
      }
    }
  }

  cambiarFocus() {
    if (this.focusOnPrecio) {
      this.claseCantidad = 'visor-selected';
      this.clasePrecio = '';
    } else {
      this.claseCantidad = '';
      this.clasePrecio = 'visor-selected';
    }
    this.focusOnPrecio = !this.focusOnPrecio;
  }

  limpiarValor() {
    if (this.focusOnPrecio) {
      this.PrecioUnitario = '0.00';
    } else {
      this.Cantidad = '0';
    }
  }

  sumar() {
    const valor = Number.parseFloat(this.Cantidad) * Number.parseFloat(this.PrecioUnitario);
    this.Valores.push(valor);
    this.Total += valor;
  }
  restar() {
    const valor = Number.parseFloat(this.Cantidad) * Number.parseFloat(this.PrecioUnitario);
    const index = this.Valores.indexOf(valor);
    if (index !== -1) {
      this.Valores.splice(index, 1);
      this.Total -= valor;
    }
  }
  pago(valor: string) {
    this._snackBar.open('Pago con: ' + valor, 'Cerrar', { duration: 2000 });
  }
}
