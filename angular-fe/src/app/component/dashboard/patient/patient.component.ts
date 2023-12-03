import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { HttpService } from '../../../../app/services/http.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  patients: any[] = [];
  formatBirthdate(birthdate: string): string {
    // Parse the string to a Date object and format it
    const date = new Date(birthdate);
    return date.toISOString().split('T')[0]; // Format as yyyy-MM-dd
  }

  constructor(
    public dialog: MatDialog,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.getPatientList();
  }

  getPatientList() {
    this.httpService.getPatients().subscribe(
      (data: any) => {
        this.patients = data; // Assuming the response is an array of patients
      },
      error => {
        console.error('Error getting patient list from the database:', error);
      }
    );
  }

  addPatient() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Register Patient'
    };

    const dialogRef = this.dialog.open(AddPatientComponent, dialogConfig);
    dialogRef.afterClosed().subscribe({
      next: (data: any) => {
        if (data) {
          console.log("Registered Patient:", data);
          this.httpService.addPatient(data).subscribe(
            response => {
              console.log('Patient added to the database:', response);
              // Refresh the patient list after adding a new patient
              this.getPatientList();
            },
            error => {
              console.error('Error adding patient to the database:', error);
            }
          );
        }
      }
    });
  }
}
