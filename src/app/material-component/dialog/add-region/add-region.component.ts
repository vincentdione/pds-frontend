import { GlobalConstants } from './../../../shared/global-constants';
import { SnackbarService } from './../../../services/snackbar.service';
import { RegionService } from 'src/app/services/region.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, EventEmitter, Inject } from '@angular/core';

@Component({
  selector: 'app-add-region',
  templateUrl: './add-region.component.html',
  styleUrls: ['./add-region.component.scss']
})
export class AddRegionComponent implements OnInit {

  onAddRegion= new EventEmitter();
  onUpdateRegion= new EventEmitter();
  regionForm:any = FormGroup;
  dialogAction : any = "Ajouter"
  action :any = "Ajouter";
  responseMessage:any;
  pays:any = [] = []

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
  private formBuilder : FormBuilder,
  private regionService: RegionService,private dialogRef: MatDialogRef<AddRegionComponent>,private snackbarService: SnackbarService) { }

  ngOnInit(): void {


    this.regionForm = this.formBuilder.group({
      reg_name: ['', Validators.required],
      reg_description: ['', Validators.required],
      selectedCountry: [null],

    });

    if(this.dialogData.action === "Modifier"){
      this.dialogAction = "Modifier"
      this.action = "Modifier"
      this.regionForm.patchValue(
        {reg_name: this.dialogData.data.reg_name,
        reg_description: this.dialogData.data.reg_description,
        selectedCountry: this.dialogData.data.payId,}
      )
    }

    this.getPays();


  }



  onAddNewRegion(){

    var regionFormData = this.regionForm.value;
    var data = {
        reg_name: regionFormData.reg_name,
        reg_description: regionFormData.reg_description,
        payId: regionFormData.selectedCountry
    }


    this.regionService.addRegion(data).subscribe(
      (res: any) => {
        this.dialogRef.close();
        this.onAddRegion.emit();
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

  onEditRegion(){

    var RegionFormData = this.regionForm.value;

    var data = {
      id : this.dialogData.data.id,
      reg_name: RegionFormData.nom,
      reg_description: RegionFormData.description,
      payId: RegionFormData.selectedCountry

    }


    this.regionService.updateRegion(data.id,data).subscribe(
      (res: any) => {
        this.dialogRef.close();
        this.onUpdateRegion.emit();
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

  getPays(){
    this.regionService.getPays().subscribe((res:any) => {
      this.pays = res
   },(error:any)=>{
     if(error.error?.message){
       this.responseMessage = error.error?.message
   }
   else {
     this.responseMessage = GlobalConstants.genericErrorMessage
   }
   this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error)
   })
  }

}
