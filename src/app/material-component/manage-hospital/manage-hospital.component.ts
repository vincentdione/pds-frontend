import { MatDialogConfig } from '@angular/material/dialog';
import { GlobalConstants } from './../../shared/global-constants';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SnackbarService } from './../../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HopitalService } from './../../services/hopital.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-hospital',
  templateUrl: './manage-hospital.component.html',
  styleUrls: ['./manage-hospital.component.scss']
})
export class ManageHospitalComponent implements OnInit {

  displayColumns : string[] = ["name","adresse","contact"]
  dataSource : any;
  responseMessage : any;

  constructor(private hospitalService: HopitalService,private ngxService:NgxUiLoaderService,private snackbarService: SnackbarService,private router:Router) { }

  ngOnInit(): void {
    this.ngxService.start()
    this.tableData()
  }

  tableData(){
      this.hospitalService.getHospitals().subscribe((res:any) => {
         this.ngxService.stop()
         this.dataSource = new MatTableDataSource(res)

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


    handleAddHopital(){
   /*    const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        action:'Ajouter'
      }
      dialogConfig.width = "850px"
      const dialogRef = this.dialog.open(PatientComponent,dialogConfig);
      this.router.events.subscribe(()=>{
        dialogRef.close();
      })
      const sub = dialogRef.componentInstance.onAddPatient.subscribe(
        (res:any)=>{
          this.tableData()
        }
      ) */

    }

    handleEditHopital(values:any){
     /*  const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        action:'Modifier',
        data: values
      }
      dialogConfig.width = "850px"
      const dialogRef = this.dialog.open(PatientComponent,dialogConfig);
      this.router.events.subscribe(()=>{
        dialogRef.close();
      })
      const sub = dialogRef.componentInstance.onUpdatePatient.subscribe(
        (res:any)=>{
          this.tableData()
        }
      ) */
    }

    handleDeleteHopital(value:any){

    }

}
