import { GlobalConstants } from './../../../shared/global-constants';
import { PatientService } from './../../../services/patient.service';
import { SnackbarService } from './../../../services/snackbar.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OnInit, EventEmitter, Inject } from '@angular/core';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-detail-cadre',
  templateUrl: './detail-cadre.component.html',
  styleUrls: ['./detail-cadre.component.scss']
})
export class DetailCadreComponent implements OnInit {

  onAddPatient= new EventEmitter();
  onUpdatePatient= new EventEmitter();

  @ViewChild('profileContainer', { static: false })
  profileContainer!: ElementRef;


  identificationForm:any = FormGroup;
  situationMilitanteForm:any = FormGroup;
  situationProfForm:any = FormGroup;
  responseMessage:any;


  dialogAction : any = "Ajouter"
  action :any = "Ajouter";

  cadre : any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
  private formBuilder : FormBuilder, private patientService: PatientService,
  private dialogRef: MatDialogRef<DetailCadreComponent>,private snackbarService: SnackbarService ) { }

  ngOnInit(): void {

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


    if(this.dialogData.action === "Détails"){
      this.dialogAction = "Détails"
      this.cadre = this.dialogData.data
      console.log("=========================================== this.dialogData =================================================================")
      console.log(this.dialogData.data)
      console.log(this.cadre)
      console.log("=========================================== this.dialogData =================================================================")


      /*  this.identificationForm.patchValue(this.dialogData.data)
      this.situationMilitanteForm.patchValue(this.dialogData.data)
      this.situationProfForm.patchValue(this.dialogData.data) */
    }

  }


  ngAfterViewInit() {
    // Wait for the view to initialize
    setTimeout(() => {
      this.generatePDF();
    });
  }

  generatePDF() {
    const element = this.profileContainer.nativeElement;

    console.log(element)

    const options = {
      margin: 10,
      filename: 'profil_cadre.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

  }

  handlePatientSubmit(){

    if(this.dialogAction === "Détails"){
       this.edit()
    }

  }

  edit(){

    var formData = this.identificationForm.value;

    var situationMilitanteFormData = this.situationMilitanteForm.value;
    var situationProfFormData = this.situationProfForm.value;

    var data = {
      id : this.dialogData.data.id,
      identification: {
        nom: formData.nom,
        prenom: formData.prenom,
        sexe: formData.sexe,
        telephone: formData.telephone,
        residence: formData.residence,
        telephoneFixe: formData.telephoneFixe,
        whatsapp: formData.whatsapp,
        email: formData.email,
        image: formData.image
      },
      situationMilitante: {
        adhesionPds: situationMilitanteFormData.adhesionPds,
        carteMembre: situationMilitanteFormData.carteMembre,
        anneeCarte: situationMilitanteFormData.anneeCarte,
        numeroCarte: situationMilitanteFormData.numeroCarte,
        fonctionsParti: situationMilitanteFormData.fonctionsParti,
        numeroCIN: situationMilitanteFormData.numeroCIN,
        dateDelivranceCIN: situationMilitanteFormData.dateDelivranceCIN,
        dateExpirationCIN: situationMilitanteFormData.dateExpirationCIN,
        numeroCarteElecteur: situationMilitanteFormData.numeroCarteElecteur,
        centreVote: situationMilitanteFormData.centreVote,
        federation: situationMilitanteFormData.federation,
        section: situationMilitanteFormData.section,
        secteur: situationMilitanteFormData.secteur,
        mouvementSoutien: situationMilitanteFormData.mouvementSoutien,
        region: situationMilitanteFormData.region,
        commune: situationMilitanteFormData.commune,
        depart: situationMilitanteFormData.depart,
        village: situationMilitanteFormData.village,
        numeroCentreVote: situationMilitanteFormData.numeroCentreVote,
        numeroBureauVote: situationMilitanteFormData.numeroBureauVote
      },
      situationProf: {
        professionActuelle: situationProfFormData.professionActuelle,
        intituleFonction1: situationProfFormData.intituleFonction1,
        intituleFonction2: situationProfFormData.intituleFonction2,
        annee1: situationProfFormData.annee1,
        annee2: situationProfFormData.annee2,
        niveauEtude: situationProfFormData.niveauEtude,
        intituleEcole1: situationProfFormData.intituleEcole1,
        intituleEcole2: situationProfFormData.intituleEcole2,
        anneeEcole1: situationProfFormData.anneeEcole1,
        anneeEcole2: situationProfFormData.anneeEcole2,
        specialisation: situationProfFormData.specialisation,
        langueParlees: situationProfFormData.langueParlees,
        langueEcrites: situationProfFormData.langueEcrites,
        autres: situationProfFormData.autres
      }
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


}
