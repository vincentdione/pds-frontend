import { ConfirmationComponent } from './../dialog/confirmation/confirmation.component';
import { AddUserComponent } from './../dialog/add-user/add-user.component';
import { GlobalConstants } from './../../shared/global-constants';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from './../../services/user.service';
import { FormBuilder } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from './../../services/snackbar.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  displayColumns : string [] = ["username","nom","prenom","email","telephone","role","etat","action"];
  dataSource:any;
  regions:any;
  responseMessage : any;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(private router: Router,
    private snackbarService : SnackbarService, private userService : UserService,
    private dialog : MatDialog, private ngxService: NgxUiLoaderService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.ngxService.start()
    this.getUsers()
  }


  getUsers(){
    this.userService.getUserss().subscribe((res:any) => {
      this.ngxService.stop()
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.paginator = this.paginator;
      console.log(res)

    },(error)=>{
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

  handleAddUser(){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action:'Ajouter'
    }
    dialogConfig.width = "1000px"
    const dialogRef = this.dialog.open(AddUserComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onAddUser.subscribe(
      (res:any)=>{
        this.getUsers()
      }
    )

  }

  handleEditUser(values:any){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action:'Modifier',
      data: values
    }
    dialogConfig.width = "1000px"
    const dialogRef = this.dialog.open(AddUserComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onUpdateUser.subscribe(
      (res:any)=>{
        this.getUsers()
      }
    )

  }

  handleDeleteUser(values:any){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message:"Supprimer l'utilisateur  "+values.prenom +" "+values.nom
    }
    const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((res)=>{
       this.ngxService.start();
       this.deleteUser(values.id)
       dialogRef.close();

    })
  }

  deleteUser(id:any){

    this.userService.deleteUser(id).subscribe((res:any)=>{
      this.ngxService.stop()
      this.getUsers()
      this.responseMessage = res?.message
      this.snackbarService.openSnackbar(this.responseMessage,"success")
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

  }

  onBlock(values: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message:"Voulez-vous vraiment Bloquer l'utilisateur  "+values.prenom +" "+values.nom
    }
    const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((res)=>{
       this.ngxService.start();
       this.block(values.id,values)
       dialogRef.close();

    })

  }

  block(id:any,values:any){
      this.userService.blockedUser(id,values).subscribe(r => {
        this.getUsers();
      });
  }

  onUnBlock(values: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message:"Voulez-vous vraiment débloquer l'utilisateur  "+values.prenom +" "+values.nom
    }
    const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((res)=>{
       this.ngxService.start();
       this.unblock(values.id,values)
       dialogRef.close();

    })
  }

  unblock(id:any,values:any){
    this.userService.unBlockedUser(id,values).subscribe(r => {
      this.getUsers();
    });
}

}
