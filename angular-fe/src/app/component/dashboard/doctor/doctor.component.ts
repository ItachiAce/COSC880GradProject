import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { data } from 'cheerio/lib/api/attributes';
import { HttpService } from '../../../../app/services/http.service';
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent {
  constructor(
    public dialog: MatDialog,
    private httpService: HttpService
  ) { }



  addDoctor() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Register doctor'
    }
    const dialogRef = this.dialog.open(AddDoctorComponent, dialogConfig);
    dialogRef.afterClosed().subscribe({
      next: (data: any) => {
        if (data) {
          console.log("Registered Doctor:", data);
          this.httpService.addDoctor(data).subscribe(
            response => {
              console.log('Doctor added to the database:', response);
            },
            error => {
              console.error('Error adding doctor to the database:', error);
            }
          );
        }
      }
    })
  }

}
