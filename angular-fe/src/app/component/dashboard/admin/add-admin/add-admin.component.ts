import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent {
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
  first_name!: string;
  last_name!: string;
  email!: string;
  username!: string;
  password!: string;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<AddAdminComponent>
  ) {
    this.title = data.title;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: ['', []],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]     
    });
  }

  cancelRegistration() {
    this.dialogRef.close();
  }

  registerAdmin() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
