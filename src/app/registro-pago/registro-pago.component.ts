import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registro-pago',
  templateUrl: './registro-pago.component.html',
  styleUrls: ['./registro-pago.component.css']
})
export class RegistroPagoComponent {
  form = new FormGroup({
    tipo: new FormControl(''),
    p_efectivo: new FormControl(0),
    p_qr: new FormControl(0),
    detalle: new FormControl('')
  });
  constructor( public dialogRef: MatDialogRef<RegistroPagoComponent>, @Inject(MAT_DIALOG_DATA) public data: any){
    //estamos en este paso
    guardar() {
      this.dialogRef.close(this.form.value);
    }
  }
}
