import { ConfirmationComponent } from './../dialog/confirmation/confirmation.component';
import { AddLangueComponent } from './../dialog/add-langue/add-langue.component';
import { GlobalConstants } from './../../shared/global-constants';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from './../../services/snackbar.service';
import { LangueService } from './../../services/langue.service';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-manage-langue',
  templateUrl: './manage-langue.component.html',
  styleUrls: ['./manage-langue.component.scss']
})
export class ManageLangueComponent implements OnInit {

  displayColumns : string [] = ["libelle","code","action"];
  dataSource:any;
  responseMessage : any;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(private langueService: LangueService, private router: Router,
    private snackbarService : SnackbarService,
    private dialog : MatDialog, private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.ngxService.start()
    this.tableData()
  }

  tableData(){
    this.langueService.getLangues().subscribe((res:any) => {
      this.ngxService.stop()
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.paginator = this.paginator;

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


  handleAddLangue(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action:'Ajouter'
    }
    dialogConfig.width = "1000px"
    const dialogRef = this.dialog.open(AddLangueComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onAddLangue.subscribe(
      (res:any)=>{
        this.tableData()
      }
    )

  }

  handleEditLangue(values:any){

    console.log(values)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action:'Modifier',
      data: values
    }
    dialogConfig.width = "1000px"
    const dialogRef = this.dialog.open(AddLangueComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onUpdatelangue.subscribe(
      (res:any)=>{
        this.tableData()
      }
    )
  }

  handleDeleteLangue(values:any){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message:"Supprimer la langue  "+values.libelle
    }
    const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((res)=>{
       this.ngxService.start();
       this.deleteLangue(values.id)
       dialogRef.close();

    })
  }

  deleteLangue(id:any){

    this.langueService.deleteLangue(id).subscribe((res:any)=>{
      this.ngxService.stop()
      this.tableData()
      this.responseMessage = res?.message
      this.snackbarService.openSnackbar("Langue supprimée avec success !","success")
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

}
