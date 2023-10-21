import { GlobalConstants } from './../../../shared/global-constants';
import { SnackbarService } from './../../../services/snackbar.service';
import { UserService } from './../../../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Inject } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {


  onAddUser= new EventEmitter();
  onUpdateUser= new EventEmitter();
  userForm:any = FormGroup;
  dialogAction : any = "Ajouter"
  action :any = "Ajouter";
  responseMessage:any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
  private formBuilder : FormBuilder,
  private userService: UserService,private dialogRef: MatDialogRef<AddUserComponent>,private snackbarService: SnackbarService) { }

  ngOnInit(): void {


    this.userForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      username: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['',[Validators.required]]
    });

    if(this.dialogData.action === "Modifier"){
      this.dialogAction = "Modifier"
      this.action = "Modifier"
      this.userForm.patchValue(this.dialogData.data)
    }

  }



  onAddNewUser(){

    var userFormData = this.userForm.value;

    var data = {
        nom: userFormData.nom,
        prenom: userFormData.prenom,
        username: userFormData.username,
        telephone: userFormData.telephone,
        email: userFormData.email,
        password: userFormData.password,
        role: userFormData.role,
    }


    this.userService.register(data).subscribe(
      (res: any) => {
        this.dialogRef.close();
        this.onAddUser.emit();
        this.responseMessage = res.message;
        this.snackbarService.openSnackbar(
          "Utilisateur ajouté avec succès",
          "success"
        );
      },
      (error) => {
        this.dialogRef.close();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericErrorMessage;
        }
        this.snackbarService.openSnackbar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
  }

  onEditUser(){

    var userFormData = this.userForm.value;

    var data = {
      id : this.dialogData.data.id,
        nom: userFormData.nom,
        prenom: userFormData.prenom,
        username: userFormData.username,
        telephone: userFormData.telephone,
        email: userFormData.email,
        role: userFormData.role,
    }


    this.userService.updateUser(data.id,data).subscribe(
      (res: any) => {
        this.dialogRef.close();
        this.onUpdateUser.emit();
        this.responseMessage = res.message;
        this.snackbarService.openSnackbar(
          res.message,
          "success"
        );
      },
      (error) => {
        this.dialogRef.close();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericErrorMessage;
        }
        this.snackbarService.openSnackbar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
  }


}
