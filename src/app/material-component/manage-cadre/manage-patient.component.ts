import { FormGroup, FormBuilder } from '@angular/forms';
import { RegionService } from 'src/app/services/region.service';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { PatientComponent } from '../dialog/patient/patient.component';
import { filter } from 'rxjs/operators';
import { GlobalConstants } from '../../shared/global-constants';
import { NavigationExtras, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';
import { PatientService } from '../../services/patient.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DetailCadreComponent } from '../dialog/detail-cadre/detail-cadre.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-manage-patient',
  templateUrl: './manage-patient.component.html',
  styleUrls: ['./manage-patient.component.scss']
})
export class ManagePatientComponent implements OnInit {

  displayColumns : string [] = ["nom","prenom","email","telephone","action"];
  dataSource:any;
  regions:any;
  responseMessage : any;
  searchForm!: FormGroup;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(private cadreService: PatientService, private router: Router,
    private snackbarService : SnackbarService, private regionService : RegionService,
    private dialog : MatDialog, private ngxService: NgxUiLoaderService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.ngxService.start()
    this.tableData()
    this.searchForm = this.fb.group({
      professionActuelle: [''], // Champ pour la profession actuelle
      langues: [''], // Champ pour les langues
      niveauEtude: [''], // Champ pour le niveau d'étude
      specialisation: [''], // Champ pour la spécialisation
      fonctionsParti: [''], // Champ pour les fonctions au parti
      region: [''], // Champ pour la région
      email: [''], // Champ pour l'email
      telephone: [''], // Champ pour le téléphone
    });


  }

  tableData(){
    this.cadreService.getCadres().subscribe((res:any) => {
      this.ngxService.stop()
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.paginator = this.paginator;

    },(error)=>{
      this.ngxService.stop()
      if(error.error?.message){
        this.responseMessage = error.error?.message
    }
    else {
      this.responseMessage = GlobalConstants.genericErrorMessage
    }
    this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error)
    })

    this.regionService.getRegions().subscribe((res:any) => {
      this.ngxService.stop()
      this.regions = res
      console.log(res)

   },(error:any)=>{
     this.ngxService.stop()
     if(error.error?.message){
       this.responseMessage = error.error?.message
   }
   else {
     this.responseMessage = GlobalConstants.genericErrorMessage
   }
   this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error)
   })

  }

  applyFilter(event:Event){
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  handleAddCadre(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action:'Ajouter'
    }
    dialogConfig.width = "1000px"
    const dialogRef = this.dialog.open(PatientComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onAddPatient.subscribe(
      (res:any)=>{
        this.tableData()
      }
    )

  }

  handleEditCadre(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action:'Modifier',
      data: values
    }
    dialogConfig.width = "1000px"
    const dialogRef = this.dialog.open(PatientComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onUpdatePatient.subscribe(
      (res:any)=>{
        this.tableData()
      }
    )
  }


  handleDeleteCadre(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message:"Supprimer le cadre  "+values.prenom +" "+values.nom
    }
    const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((res)=>{
       this.ngxService.start();
       this.deletePatient(values.id)
       dialogRef.close();

    })
  }

  handleDetailCadre(element:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action:'Détails',
      data: element
    }
    dialogConfig.width = "1000px"
    const dialogRef = this.dialog.open(DetailCadreComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onUpdatePatient.subscribe(
      (res:any)=>{
        this.tableData()
      }
    )
  }

  deletePatient(id:any){
    this.cadreService.deleteCadre(id).subscribe((res:any)=>{
        this.ngxService.stop()
        this.tableData()
        this.responseMessage = res?.message
        this.snackbarService.openSnackbar(this.responseMessage,"success")
    },(error:any)=>{
      this.ngxService.stop()
      if(error.error?.message){
        this.responseMessage = error.error?.message
    }
    else {
      this.responseMessage = GlobalConstants.genericErrorMessage
    }
    this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error)
    })

  }

  refreshTable(data: any[]) {
    this.dataSource = new MatTableDataSource(data);
  }

  handleSearch(){
    const formData = this.searchForm.value;

    this.cadreService.searchCadre(formData).subscribe((res:any) =>{

      this.ngxService.stop();
      this.refreshTable(res.data);
    },(error)=>{
      this.ngxService.stop()
      if(error.error?.message){
        this.responseMessage = error.error?.message
    }
    else {
      this.responseMessage = GlobalConstants.genericErrorMessage
    }
    this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error)
    })
    console.log(formData);

  }

  handleRedirectDetailCadre(value:any){
    const navigationExtras: NavigationExtras = {
      state: {
        data: value
      }
    };
    this.router.navigate([`/workspace/cadres/${value.id}`]);
  }

}
