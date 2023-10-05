import { MatPaginator } from '@angular/material/paginator';
import { GlobalConstants } from './../../shared/global-constants';
import { MatTableDataSource } from '@angular/material/table';
import { DepartementService } from './../../services/departement.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from './../../services/snackbar.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-manage-departement',
  templateUrl: './manage-departement.component.html',
  styleUrls: ['./manage-departement.component.scss']
})
export class ManageDepartementComponent implements OnInit {


  displayColumns : string [] = ["region","nom","description","action"];
  dataSource:any;
  responseMessage : any;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(private router: Router,
    private snackbarService : SnackbarService, private departementService : DepartementService,
    private dialog : MatDialog, private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.ngxService.start()
    this.tableData()
  }

  tableData(){
    this.departementService.getDepartements().subscribe((res:any) => {
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

  }

  handleEditLocalite(values:any){

  }

  handleDeleteLocalite(values:any){

  }

}
