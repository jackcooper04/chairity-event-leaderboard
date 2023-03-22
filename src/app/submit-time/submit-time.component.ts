import { Component } from '@angular/core';
import { ScannerComponent } from './scanner/scanner.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-submit-time',
  templateUrl: './submit-time.component.html',
  styleUrls: ['./submit-time.component.css']
})
export class SubmitTimeComponent {
  constructor(public matDialog: MatDialog){}
  openScanner() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = false;
    dialogConfig.id = "scanner-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    let modalDialog = this.matDialog.open(ScannerComponent, {width:"600px", height:"350px"});
  }
}
