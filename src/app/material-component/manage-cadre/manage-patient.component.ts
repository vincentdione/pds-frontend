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
import * as XLSX from 'xlsx';
import { LangueService } from 'src/app/services/langue.service';


@Component({
  selector: 'app-manage-patient',
  templateUrl: './manage-patient.component.html',
  styleUrls: ['./manage-patient.component.scss']
})
export class ManagePatientComponent implements OnInit {

  displayColumns : string [] = ["image","matricule","nom","prenom","email","telephone","action"];
  dataSource:any;
  regions:any;
  responseMessage : any;
  searchForm!: FormGroup;

  selectedFile: File | null = null;

  excelData:any;
  langues: any [] = [];


  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(private cadreService: PatientService, private router: Router, private langueService:LangueService,
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
      fonctionActuelle: [''], // Champ pour les fonctions au parti
      region: [''], // Champ pour la région
      email: [''], // Champ pour l'email
      telephone: [''], // Champ pour le téléphone
    });

    this.getLangues()

    this.dialog.afterAllClosed.subscribe(() => {
      this.onUpdateTable();
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


  onUpdateTable() {
    this.tableData();
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
    console.log(values)
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


  getLangues(){
    this.langueService.getLangues().subscribe((res:any) => {
      this.langues = res
      console.log(res)
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

  refreshTable(data: any[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;

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

  onFileSelected(event: any): void {
    this.ngxService.start()

    const file = event.target.files[0];

  const fileReader = new FileReader();
  fileReader.readAsArrayBuffer(file);
  fileReader.onload = (e: any) => {
    const arrayBuffer = e.target.result;

    // Decode the ArrayBuffer into a string using TextDecoder
    const textDecoder = new TextDecoder('utf-8');
    const fileContent = textDecoder.decode(arrayBuffer);

    // Parse the file content as JSON
    const workbook = XLSX.read(fileContent, { type: 'binary' });
    const sheetNames = workbook.SheetNames;
    const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);


    // Call the importCadres method to send data to the service
    this.cadreService.importCadres(excelData).subscribe(
      (response) => {
        this.ngxService.stop()
        console.log('Data imported successfully:', response);
        this.snackbarService.openSnackbar("Données importées avec succes!","success")
        this.tableData()
      },
      (error) => {
        this.ngxService.stop()
        console.error('Error importing data:', error);
      }
    );
  };

  }

  importFile(): void {
    if (this.selectedFile) {
      // Your file import logic goes here
      console.log('File selected:', this.selectedFile);
      // You can now perform operations on this.selectedFile, such as uploading it to a server.
    } else {
      console.error('No file selected');
    }
  }

  getImageUrl(cadre:any): string {
    return cadre.image ? this.cadreService.getImageUrl(cadre.image) : '../../../assets/img/profil.png';
  }

}
