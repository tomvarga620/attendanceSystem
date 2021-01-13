import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-generic-dialog',
  templateUrl: './generic-dialog.component.html',
  styleUrls: ['./generic-dialog.component.css']
})
export class GenericDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    cancelButtonText: string,
    confirmButtonText: string,
    messageText: string,
    titleText: string
  }, private mdDialogRef: MatDialogRef<GenericDialogComponent>){}

  ngOnInit(): void {
  }

  public cancel() {
    this.close(false);
  }

  public close(value) {
    this.mdDialogRef.close(value);
  }

  public confirm() {
    this.close(true);
  }

  @HostListener("keydown.esc") 
  public onEsc() {
    this.close(false);
  }
  
}
