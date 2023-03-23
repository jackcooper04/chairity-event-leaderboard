import { Component, ContentChild } from '@angular/core';
import { StudentComponent } from './student/student.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-submit-time',
  templateUrl: './submit-time.component.html',
  styleUrls: ['./submit-time.component.css']
})
export class SubmitTimeComponent {
  constructor(public matDialog: MatDialog){}
  openStudent() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = false;
    dialogConfig.id = "student-component";
    dialogConfig.width = "30vw";
    
    // https://material.angular.io/components/dialog/overview
    let modalDialog = this.matDialog.open(StudentComponent, dialogConfig);
  }
}
