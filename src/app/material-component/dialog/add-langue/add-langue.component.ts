import { GlobalConstants } from './../../../shared/global-constants';
import { SnackbarService } from './../../../services/snackbar.service';
import { LangueService } from './../../../services/langue.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Inject } from '@angular/core';

@Component({
  selector: 'app-add-langue',
  templateUrl: './add-langue.component.html',
  styleUrls: ['./add-langue.component.scss']
})
export class AddLangueComponent implements OnInit {

  onAddLangue= new EventEmitter();
  onUpdatelangue= new EventEmitter();
  langueForm:any = FormGroup;
  dialogAction : any = "Ajouter"
  action :any = "Ajouter";
  responseMessage:any;
  pays:any = [] = []

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
  private formBuilder : FormBuilder,
  private langueService: LangueService,private dialogRef: MatDialogRef<AddLangueComponent>,private snackbarService: SnackbarService) { }

  ngOnInit(): void {


    this.langueForm = this.formBuilder.group({
      libelle: ['', Validators.required],
      code: ['', Validators.required],
    });

    if(this.dialogData.action === "Modifier"){
      this.dialogAction = "Modifier"
      this.action = "Modifier"
      console.log("===================");
      console.log(this.dialogData.data);
      this.langueForm.patchValue({
        libelle: this.dialogData.data.libelle,
        code: this.dialogData.data.code
      });


    }



  }



  onAddNewLangue(){

    var langueFormData = this.langueForm.value;
    var data = {
      libelle: langueFormData.libelle,
      code: langueFormData.code,
    }


    this.langueService.addLangue(data).subscribe(
      (res: any) => {
        this.dialogRef.close();
        this.onAddLangue.emit();
        this.responseMessage = res.message;
        this.snackbarService.openSnackbar(
          "Langue ajoutée avec succès",
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

  onEditLangue(){

    var langueFormData = this.langueForm.value;

    var data = {
      id : this.dialogData.data.id,
      libelle: langueFormData.libelle,
      code: langueFormData.code,
    }


    this.langueService.updateLangue(data.id,data).subscribe(
      (res: any) => {
        this.dialogRef.close();
        this.onUpdatelangue.emit();
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
