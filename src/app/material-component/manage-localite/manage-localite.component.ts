import { ConfirmationComponent } from './../dialog/confirmation/confirmation.component';
import { AddRegionComponent } from './../dialog/add-region/add-region.component';
import { MatPaginator } from '@angular/material/paginator';
import { GlobalConstants } from './../../shared/global-constants';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from './../../services/snackbar.service';
import { Router } from '@angular/router';
import { LocaliteService } from './../services/localite.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RegionService } from 'src/app/services/region.service';

@Component({
  selector: 'app-manage-localite',
  templateUrl: './manage-localite.component.html',
  styleUrls: ['./manage-localite.component.scss']
})
export class ManageLocaliteComponent implements OnInit {

  displayColumns : string [] = ["nom","description","action"];
  dataSource:any;
  responseMessage : any;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(private localiteService: LocaliteService, private router: Router,
    private snackbarService : SnackbarService, private regionService : RegionService,
    private dialog : MatDialog, private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.ngxService.start()
    this.tableData()
  }

  tableData(){
    this.regionService.getRegions().subscribe((res:any) => {
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


  handleAddLocalite(){


    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action:'Ajouter'
    }
    dialogConfig.width = "1000px"
    const dialogRef = this.dialog.open(AddRegionComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onAddRegion.subscribe(
      (res:any)=>{
        this.tableData()
      }
    )

  }

  handleEditLocalite(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action:'Modifier',
      data: values
    }
    dialogConfig.width = "1000px"
    const dialogRef = this.dialog.open(AddRegionComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onUpdateRegion.subscribe(
      (res:any)=>{
        this.tableData()
      }
    )
  }

  handleDeleteLocalite(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message:"Supprimer la région  "+values.reg_name
    }
    const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((res)=>{
       this.ngxService.start();
       this.deleteRegion(values.id)
       dialogRef.close();

    })
  }


  deleteRegion(id:any){

    this.regionService.deleteRegion(id).subscribe((res:any)=>{
      this.ngxService.stop()
      this.tableData()
      this.responseMessage = res?.message
      this.snackbarService.openSnackbar("Région supprimée avec success !","success")
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
