import { GlobalConstants } from './../../../shared/global-constants';
import { SnackbarService } from './../../../services/snackbar.service';
import { PatientService } from './../../../services/patient.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Inject } from '@angular/core';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  onAddPatient= new EventEmitter();
  onUpdatePatient= new EventEmitter();
  identificationForm:any = FormGroup;
  situationMilitanteForm:any = FormGroup;
  situationProfForm:any = FormGroup;
  dialogAction : any = "Ajouter"
  action :any = "Ajouter";
  responseMessage:any;
  imagePreviewUrl: string | ArrayBuffer | any;
  langues: string[] = [];


  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
  private formBuilder : FormBuilder,
  private patientService: PatientService,private dialogRef: MatDialogRef<PatientComponent>,private snackbarService: SnackbarService ) { }

  ngOnInit(): void {
   /*  this.cadreForm = this.formBuilder.group({
      nom :[null,[Validators.required]],
      prenom :[null,[Validators.required]],
      adresse :[null],
      telephone :[null,[Validators.required,Validators.pattern(GlobalConstants.contactNumberRegex)]],
      telephone2 :[null],
      email :[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      dateNaissance :[null]
    }) */

    this.identificationForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      sexe: ['', Validators.required],
      telephone: ['', Validators.required],
      residence: ['', Validators.required],
      telephoneFixe: [''],
      whatsapp: [''],
      email: ['', [Validators.required, Validators.email]],
      image: ['']
    });

    this.situationMilitanteForm = this.formBuilder.group({
      adhesionPds: ['', Validators.required],
      carteMembre: ['', Validators.required],
      anneeCarte: [''],
      numeroCarte: [''],
      fonctionsParti: ['', Validators.required],
      numeroCIN: ['', Validators.required],
      dateDelivranceCIN: ['', Validators.required],
      dateExpirationCIN: ['', Validators.required],
      numeroCarteElecteur: ['', Validators.required],
      centreVote: ['', Validators.required],
      federation: ['', Validators.required],
      section: ['', Validators.required],
      secteur: ['', Validators.required],
      mouvementSoutien: ['', Validators.required],
      region: ['', Validators.required],
      commune: ['', Validators.required],
      depart: ['', Validators.required],
      village: ['', Validators.required],
      numeroCentreVote: ['', Validators.required],
      numeroBureauVote: ['', Validators.required],

    });

    this.situationProfForm = this.formBuilder.group({
      professionActuelle: ['', Validators.required],
      intituleFonction1: ['', Validators.required],
      intituleFonction2: ['', Validators.required],
      annee1: ['', Validators.required],
      annee2: ['', Validators.required],
      niveauEtude: ['', Validators.required],
      intituleEcole1: ['', Validators.required],
      intituleEcole2: ['', Validators.required],
      anneeEcole1: ['', Validators.required],
      anneeEcole2: ['', Validators.required],
      specialisation: ['', Validators.required],
      langueParlees: this.formBuilder.array([]),
      langueEcrites: this.formBuilder.array([]),
      autres: ['', Validators.required],

    });

    if(this.dialogData.action === "Modifier"){
      this.dialogAction = "Modifier"
      this.action = "Modifier"
      this.identificationForm.patchValue(this.dialogData.data)
    }

  }

  handlePatientSubmit(){

    if(this.dialogAction === "Modifier"){
       this.edit()
    }
    else {
      console.log("add")
      this.add()
    }

  }

  add(){
    var formData = this.identificationForm.value;

    var data = {
      nom : formData.nom,
      prenom : formData.prenom,
      adresse : formData.adresse,
      dateNaissance : formData.dateNaissance,
      email : formData.email,
      telephone : formData.telephone,
      telephone2 : formData.telephone2,
    }

    this.patientService.addCadre(data).subscribe((res:any)=>{
       this.dialogRef.close()
       this.onAddPatient.emit();
       this.responseMessage = res.message
       this.snackbarService.openSnackbar("Cadre ajouté avec success","success")
    },(error)=>{
      this.dialogRef.close();
      if(error.error?.message){
          this.responseMessage = error.error?.message
      }
      else {
        this.responseMessage = GlobalConstants.genericErrorMessage
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error)
    })

  }

  edit(){

    var formData = this.identificationForm.value;
    console.log(this.identificationForm.value)

    var data = {
      id : this.dialogData.data.id,
      nom : formData.nom,
      prenom : formData.prenom,
      adresse : formData.adresse,
      dateNaissance : formData.dateNaissance,
      email : formData.email,
      telephone : formData.telephone,
      telephone2 : formData.telephone2,
    }

    this.patientService.updateCadre(data).subscribe((res:any)=>{
       this.dialogRef.close()
       this.onUpdatePatient.emit();
       this.responseMessage = res.message
       this.snackbarService.openSnackbar(this.responseMessage,"success")
    },(error)=>{
      this.dialogRef.close();
      if(error.error?.message){
          this.responseMessage = error.error?.message
      }
      else {
        this.responseMessage = GlobalConstants.genericErrorMessage
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error)
    })

  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onSubmitClick(stepper:any) {
    if (stepper.selectedIndex === 0 && this.identificationForm.valid) {
      stepper.next();
    } else if (stepper.selectedIndex === 1 && this.situationMilitanteForm.valid) {
      // Effectuer les actions nécessaires avec les données du formulaire
      stepper.next();
    }
    else if (stepper.selectedIndex === 2 && this.situationProfForm.valid) {
      // Effectuer les actions nécessaires avec les données du formulaire
      this.dialogRef.close();
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Lecture de l'image en tant que Data URL
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }



  onLangueChecked(langue: string, isChecked: boolean) {
    if (isChecked) {
      // Ajouter la langue à la liste des langues sélectionnées
      this.langues.push(langue);
    } else {
      // Retirer la langue de la liste des langues sélectionnées
      const index = this.langues.indexOf(langue);
      if (index !== -1) {
        this.langues.splice(index, 1);
      }
    }
  }

}

