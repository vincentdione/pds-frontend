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

	ngAfterViewInit() { }

	constructor(private dashboardService : DashboardService,private cadreService: PatientService,
    private ngxService: NgxUiLoaderService,private snackbarService: SnackbarService) {
    this.ngxService.start()
    this.dashboardData()
	}

  dashboardData(){
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

}
