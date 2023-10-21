import { CommuneService } from './../services/commune.service';
import { DepartementService } from './../services/departement.service';
import { RegionService } from './../services/region.service';
import { PatientService } from './../services/patient.service';
import { GlobalConstants } from './../shared/global-constants';
import { SnackbarService } from './../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DashboardService } from './../services/dashboard.service';
import { Component, AfterViewInit } from '@angular/core';
import { error } from 'console';
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  responseMessage : any;
  data : any;
  regions : any;
  departements : any;
  communes : any;

	ngAfterViewInit() { }

	constructor(private dashboardService : DashboardService,private cadreService: PatientService,
    private regionService: RegionService,private departService: DepartementService,private communeService: CommuneService,
    private ngxService: NgxUiLoaderService,private snackbarService: SnackbarService) {
    this.ngxService.start()
    this.dashboardData()
	}

  dashboardData(){
      this.getCadres()
      this.getRegions()
      this.getCommunes()
      this.getDepartements()

  }

  getCadres(){
    this.cadreService.getCadres().subscribe((res:any) => {
      this.ngxService.stop()
      this.data =res
    },(error)=>{
      this.ngxService.stop()
      console.log(error)
      if(error.error?.message){
        this.responseMessage = error.error?.message
    }
    else {
      this.responseMessage = GlobalConstants.genericErrorMessage
    }
    this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error)
    })
  }

  getRegions(){
    this.regionService.getRegions().subscribe((res:any) => {
      this.ngxService.stop()
      this.regions =res
    },(error)=>{
      this.ngxService.stop()
      console.log(error)
      if(error.error?.message){
        this.responseMessage = error.error?.message
    }
    else {
      this.responseMessage = GlobalConstants.genericErrorMessage
    }
    this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error)
    })
  }

  getCommunes(){
    this.communeService.getCommunes().subscribe((res:any) => {
      this.ngxService.stop()
      this.communes =res
    },(error)=>{
      this.ngxService.stop()
      console.log(error)
      if(error.error?.message){
        this.responseMessage = error.error?.message
    }
    else {
      this.responseMessage = GlobalConstants.genericErrorMessage
    }
    this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error)
    })
  }

  getDepartements(){
    this.departService.getDepartements().subscribe((res:any) => {
      this.ngxService.stop()
      this.departements =res
    },(error)=>{
      this.ngxService.stop()
      console.log(error)
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
