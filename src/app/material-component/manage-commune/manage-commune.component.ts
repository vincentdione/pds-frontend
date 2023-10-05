import { MatPaginator } from '@angular/material/paginator';
import { GlobalConstants } from './../../shared/global-constants';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog } from '@angular/material/dialog';
import { CommuneService } from './../../services/commune.service';
import { SnackbarService } from './../../services/snackbar.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-manage-commune',
  templateUrl: './manage-commune.component.html',
  styleUrls: ['./manage-commune.component.scss']
})
export class ManageCommuneComponent implements OnInit {



  displayColumns : string [] = ["dept","nom","description","electeurs","lieux","action"];
  dataSource:any;
  responseMessage : any;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(private router: Router,
    private snackbarService : SnackbarService, private communeService : CommuneService,
    private dialog : MatDialog, private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.ngxService.start()
    this.tableData()
  }

  tableData(){
    this.communeService.getCommunes().subscribe((res:any) => {
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
