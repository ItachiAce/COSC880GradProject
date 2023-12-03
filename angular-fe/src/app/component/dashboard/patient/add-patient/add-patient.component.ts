import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent {
  cancelMessage: string = '';
  completionMessage: string = '';

  onCancel() {
    this.cancelMessage = 'Registration canceled.';
  }

  onRegister() {
    this.completionMessage = 'Registration completed successfully!';
  }

  form!: FormGroup;
  title!: string;
  firstName!: string;
  lastName!: string;
  address!: string;
  email!: string;
  username!: string;
  password!: string;
  birthdate!: string;
  

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<AddPatientComponent>
  ) {
    this.title = data.title;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: ['', []],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      birthdate: ['', [Validators.required]]
    });
  }

  cancelRegistration() {
    this.dialogRef.close();
  }

  registerPatient() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
