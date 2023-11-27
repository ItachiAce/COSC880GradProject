
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent {
  cancelMessage: string = '';
  completionMessage: string = '';

  onCancel() {
    this.cancelMessage = 'Registration canceled.';
  }

  onRegister() {

    this.completionMessage = 'Registration completed successfully!';
  }
  form !: FormGroup;
  title !: string;
  first_name !: string;
  last_name !: string;
  address!: string;
  email!: string;
  username!: string;
  password!: string;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any,
    private DialogRef: MatDialogRef<AddDoctorComponent>
  ) {
    this.title = data.title;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: ['', []],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required], Validators.email],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }
  cancelRegistration(){
    this.DialogRef.close();
  }
  registerDoctor(){
    this.DialogRef.close(this.form.value);
  }
}
