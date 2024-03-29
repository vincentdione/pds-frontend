import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { MaterialModule } from '../shared/material-module';
import { ViewBillProductsComponent } from './dialog/view-bill-products/view-bill-products.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { ChangePasswordComponent } from './dialog/change-password/change-password.component';
import { ManagePatientComponent } from './manage-cadre/manage-patient.component';
import { PatientComponent } from './dialog/patient/patient.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageLocaliteComponent } from './manage-localite/manage-localite.component';
import { ManageDepartementComponent } from './manage-departement/manage-departement.component';
import { ManageCommuneComponent } from './manage-commune/manage-commune.component';
import { MaterialComponentComponent } from './material-component/material-component.component';
import { DetailCadreComponent } from './dialog/detail-cadre/detail-cadre.component';
import { ManageDetailCadreComponent } from './manage-detail-cadre/manage-detail-cadre.component';
import { AddUserComponent } from './dialog/add-user/add-user.component';
import { ManageLangueComponent } from './manage-langue/manage-langue.component';
import { AddRegionComponent } from './dialog/add-region/add-region.component';
import { AddLangueComponent } from './dialog/add-langue/add-langue.component';



const firebaseConfig = {
  apiKey: "AIzaSyBxrXB6Xu9srs0sjSr1sNcAffSKMNGET-U",
  authDomain: "gpimg-e6be6.firebaseapp.com",
  projectId: "gpimg-e6be6",
  storageBucket: "gpimg-e6be6.appspot.com",
  messagingSenderId: "188516420512",
  appId: "1:188516420512:web:98bbbfe7c1f93ee1bcb2c5",
  measurementId: "G-N37W5QHDCV"
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [],
  declarations: [
    ViewBillProductsComponent,
    ConfirmationComponent,
    ChangePasswordComponent,
    ManagePatientComponent,
    PatientComponent,
    ManageUsersComponent,
    ManageLocaliteComponent,
    ManageDepartementComponent,
    ManageCommuneComponent,
    MaterialComponentComponent,
    DetailCadreComponent,
    ManageDetailCadreComponent,
    AddUserComponent,
    ManageLangueComponent,
    AddRegionComponent,
    AddLangueComponent,
  ]
})
export class MaterialComponentsModule {}
