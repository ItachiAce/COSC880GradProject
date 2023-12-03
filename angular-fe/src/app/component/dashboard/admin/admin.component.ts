import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { HttpService } from '../../../../app/services/http.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  admins: any[] = [];
  

  constructor(
    public dialog: MatDialog,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.getAdminList();
  }

  getAdminList() {
    this.httpService.getAdmins().subscribe(
      (data: any) => {
        this.admins = data; // Assuming the response is an array of patients
      },
      error => {
        console.error('Error getting admin list from the database:', error);
      }
    );
  }

  addAdmin() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Register Admin'
    };

    const dialogRef = this.dialog.open(AddAdminComponent, dialogConfig);
    dialogRef.afterClosed().subscribe({
      next: (data: any) => {
        if (data) {
          console.log("Registered Admin:", data);
          this.httpService.addAdmin(data).subscribe(
            response => {
              console.log('Admin added to the database:', response);
              this.getAdminList();
            },
            error => {
              console.error('Error adding admin to the database:', error);
            }
          );
        }
      }
    });
  }
}
