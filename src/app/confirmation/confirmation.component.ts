import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent{

@Input() data:any;

constructor(
  public dialogRef: MatDialogRef<ConfirmationComponent>) {}


onConfirm() {
  this.dialogRef.close(true);
}

onDismiss() {
  this.dialogRef.close(false);
}
}
