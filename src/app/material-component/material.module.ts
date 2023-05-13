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
import { ManageHospitalComponent } from './manage-hospital/manage-hospital.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageLocaliteComponent } from './manage-localite/manage-localite.component';

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
    ManageHospitalComponent,
    ManageUsersComponent,
    ManageLocaliteComponent,
  ]
})
export class MaterialComponentsModule {}
