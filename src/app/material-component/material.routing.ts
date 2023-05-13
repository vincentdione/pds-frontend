import { ManageLocaliteComponent } from './manage-localite/manage-localite.component';
import { ManageHospitalComponent } from './manage-hospital/manage-hospital.component';
import { RouteGuardService } from './../services/route-guard.service';
import { ManagePatientComponent } from './manage-cadre/manage-patient.component';
import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';


export const MaterialRoutes: Routes = [
  {path:'cadres', component:ManagePatientComponent,
    canActivate:[RouteGuardService],
    data : {
     expectedRole: ["ROLE_ADMIN"]
    }
   },
   {path:'localites', component:ManageLocaliteComponent,
    canActivate:[RouteGuardService],
    data : {
     expectedRole: ["ROLE_ADMIN"]
    }
   },
   {path:'localites', component:ManageLocaliteComponent,
   canActivate:[RouteGuardService],
   data : {
    expectedRole: ["ROLE_ADMIN"]
   }
  },
];
