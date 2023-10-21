import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageDetailCadreComponent } from './manage-detail-cadre/manage-detail-cadre.component';
import { MaterialComponentComponent } from './material-component/material-component.component';
import { ManageCommuneComponent } from './manage-commune/manage-commune.component';
import { ManageDepartementComponent } from './manage-departement/manage-departement.component';
import { ManageLocaliteComponent } from './manage-localite/manage-localite.component';
import { RouteGuardService } from './../services/route-guard.service';
import { ManagePatientComponent } from './manage-cadre/manage-patient.component';
import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';


export const MaterialRoutes: Routes = [
  {path:'', component:MaterialComponentComponent,
  canActivate:[RouteGuardService],
  data : {
   expectedRole: ["ROLE_SUPER_ADMIN","ROLE_ADMIN"]
  }
 },
  {path:'cadres', component:ManagePatientComponent,
    canActivate:[RouteGuardService],
    data : {
     expectedRole: ["ROLE_SUPER_ADMIN","ROLE_ADMIN"]
    }
   },
   {path:'cadres/:id', component:ManageDetailCadreComponent,
   canActivate:[RouteGuardService],
   data : {
    expectedRole: ["ROLE_SUPER_ADMIN","ROLE_ADMIN"]
   }
  },
  {path:'users', component:ManageUsersComponent,
    canActivate:[RouteGuardService],
    data : {
     expectedRole: ["ROLE_SUPER_ADMIN","ROLE_ADMIN"]
    }
   },

   {path:'regions', component:ManageLocaliteComponent,
    canActivate:[RouteGuardService],
    data : {
     expectedRole: ["ROLE_ADMIN"]
    }
   },
   {path:'departements', component:ManageDepartementComponent,
   canActivate:[RouteGuardService],
   data : {
    expectedRole: ["ROLE_ADMIN"]
   }
  },
  {path:'communes', component:ManageCommuneComponent,
  canActivate:[RouteGuardService],
  data : {
   expectedRole: ["ROLE_ADMIN"]
  }
 },

];
