import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from './../../services/snackbar.service';
import { Router } from '@angular/router';
import { LocaliteService } from './../services/localite.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-localite',
  templateUrl: './manage-localite.component.html',
  styleUrls: ['./manage-localite.component.scss']
})
export class ManageLocaliteComponent implements OnInit {

  displayColumns : string [] = ["pays","regions","departement","commune","centre","action"];
  dataSource:any;
  responseMessage : any;

  constructor(private localiteService: LocaliteService, private router: Router,
    private snackbarService : SnackbarService,
    private dialog : MatDialog, private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.ngxService.start()
    this.tableData()
  }

  tableData(){

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
