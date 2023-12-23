import { LangueService } from './../../../services/langue.service';
import { GlobalConstants } from './../../../shared/global-constants';
import { SnackbarService } from './../../../services/snackbar.service';
import { PatientService } from './../../../services/patient.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
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
  imagePreviewUrl: string | ArrayBuffer | null = null;
  langues: any [] = [];

  selectedFile!: File;


  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
  private formBuilder : FormBuilder,private langueService: LangueService,
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
      url: [''],
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
      circonscription: ['', Validators.required],
      centreVote: ['', Validators.required],
      region: ['', Validators.required],
      commune: ['', Validators.required],
      depart: ['', Validators.required],
      village: ['', Validators.required],
      numeroCentreVote: ['', Validators.required],
      numeroBureauVote: ['', Validators.required],

    });

    this.situationProfForm = this.formBuilder.group({
      professionActuelle: ['', Validators.required],
      fonctionActuelle: [''],
      fonctionAnterieures: this.formBuilder.array([]),
      niveauEtude: ['', Validators.required],
      diplomes: this.formBuilder.array([]), // Initialize with one field
      specialisation: ['', Validators.required],
      langueParlees: [[]],
      langueEcrites: [[]],
      autres: ['', Validators.required],
    });



    if(this.dialogData.action === "Modifier"){
      this.dialogAction = "Modifier"
      this.action = "Modifier"
      this.identificationForm.patchValue(this.dialogData.data)
      this.situationMilitanteForm.patchValue(this.dialogData.data)
     // this.situationProfForm.patchValue(this.dialogData.data)
     // Situation Professionnelle Form

     this.situationProfForm.patchValue({
      professionActuelle: this.dialogData.data.professionActuelle?.toString() || '',
      fonctionActuelle: this.dialogData.data.fonctionActuelle || '',
      specialisation: this.dialogData.data.specialisation || '',
      niveauEtude: this.dialogData.data.niveauEtude || '',
      diplomes: this.dialogData.data.diplome ? this.dialogData.data.diplome.map((diplome: any) => this.formBuilder.control(diplome)) : [],
      fonctionAnterieures: this.dialogData.data.fonctionAnterieure ? this.dialogData.data.fonctionAnterieure.map((fonctionAnterieure: any) => this.formBuilder.control(fonctionAnterieure)) : [],
      langueParlees: this.dialogData.data.languesParlees || '',
      langueEcrites: this.dialogData.data.languesEcrites || '',
      autres: this.dialogData.data.autres || '',
    });

    console.log("this.situationProfForm.patchValue")
    console.log(this.dialogData.data)
    console.log(this.dialogData.data.professionActuelle.toString())
    console.log(this.dialogData.data.diplome);
    console.log(this.dialogData.data.fonctionAnterieure);
    console.log(this.dialogData.data.languesParlees);
    console.log(this.dialogData.data.langueEcrites);
    console.log(this.situationProfForm.get('langueParlees').value);
    console.log(this.situationProfForm.get('langueEcrites').value);

    console.log(this.situationProfForm.get('diplomes'))
    console.log(this.situationProfForm.get('fonctionAnterieures'))
    console.log(this.situationProfForm.get('langueParlees'))
    console.log(this.situationProfForm.get('langueEcrites'))
    console.log("this.situationProfForm.patchValue")

    if (this.dialogData.data) {
      // Patch des valeurs pour le FormArray des diplômes
      const diplomesArray = this.situationProfForm.get('diplomes') as FormArray;
      diplomesArray.clear(); // Supprime tous les contrôles existants du FormArray

      if (this.dialogData.data.diplome && Array.isArray(this.dialogData.data.diplome)) {
        this.dialogData.data.diplome.forEach((diplome: any) => {
          diplomesArray.push(this.formBuilder.control(diplome));
        });
      }

      // Patch des valeurs pour le FormArray des fonctions antérieures
      const fonctionsAnterieuresArray = this.situationProfForm.get('fonctionAnterieures') as FormArray;
      fonctionsAnterieuresArray.clear(); // Supprime tous les contrôles existants du FormArray

      if (this.dialogData.data.fonctionAnterieure && Array.isArray(this.dialogData.data.fonctionAnterieure)) {
        this.dialogData.data.fonctionAnterieure.forEach((fonctionAnterieure: any) => {
          fonctionsAnterieuresArray.push(this.formBuilder.control(fonctionAnterieure));
        });
      }
    }


    }

    this.getLangues()

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

  getLanguesParlees(): string[] {
    return this.situationProfForm.get('langueParlees').value as string[];
  }

  getDiplomes(): string[] {
    return this.situationProfForm.get('diplomes').value as string[];
  }

  getFonctionAnterieuress(): string[] {
    return this.situationProfForm.get('fonctionAnterieures').value as string[];
  }

  getLanguesEcrites(): string[] {
    return this.situationProfForm.get('langueEcrites').value as string[];
  }
  add() {
    var identificationFormData = this.identificationForm.value;
    var situationMilitanteFormData = this.situationMilitanteForm.value;
    var situationProfFormData = this.situationProfForm.value;

    const langueParlees = this.getLanguesParlees();
    const langueEcrites = this.getLanguesEcrites();
    const diplomes = this.getDiplomes();
    const fonctionAnterieures = this.getFonctionAnterieuress();


    console.log(situationProfFormData)

    const formData = new FormData();

    if (identificationFormData.image instanceof File) {
  formData.append("file", identificationFormData.image);
} else {
  console.error("identificationFormData.image is not a File object");
  // Handle the error or log it as appropriate.
}


    var data = {

      identification: {
        nom: identificationFormData.nom,
        prenom: identificationFormData.prenom,
        sexe: identificationFormData.sexe,
        telephone: identificationFormData.telephone,
        residence: identificationFormData.residence,
        telephoneFixe: identificationFormData.telephoneFixe,
        whatsapp: identificationFormData.whatsapp,
        email: identificationFormData.email,
        image: identificationFormData.image,
        url: identificationFormData.url
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
        circonscription: situationMilitanteFormData.circonscription,
        region: situationMilitanteFormData.region,
        commune: situationMilitanteFormData.commune,
        depart: situationMilitanteFormData.depart,
        village: situationMilitanteFormData.village,
        numeroCentreVote: situationMilitanteFormData.numeroCentreVote,
        numeroBureauVote: situationMilitanteFormData.numeroBureauVote
      },
      situationProf: {
        professionActuelle: situationProfFormData.professionActuelle,
        fonctionActuelle: situationProfFormData.fonctionActuelle,
        niveauEtude: situationProfFormData.niveauEtude,
        fonctionAnterieures:fonctionAnterieures,
        diplomes: diplomes, // Initialize with one field
        specialisation: situationProfFormData.specialisation,
        langueParlees: langueParlees,
        langueEcrites: langueEcrites,
        autres: situationProfFormData.autres
      }



    };

    console.log(data.situationProf)

    this.patientService.addCadre(data,this.selectedFile).subscribe(
      (res: any) => {
        this.dialogRef.close();
        this.onAddPatient.emit();
        this.responseMessage = res.message;
        this.snackbarService.openSnackbar(
          "Cadre ajouté avec succès",
          "success"
        );
      },
      (error) => {
        this.dialogRef.close();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericErrorMessage;
        }
        this.snackbarService.openSnackbar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
  }


/*
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
 */
  edit(){

    var formData = this.identificationForm.value;

    var situationMilitanteFormData = this.situationMilitanteForm.value;
    var situationProfFormData = this.situationProfForm.value;

    const langueParlees = this.getLanguesParlees();
    const langueEcrites = this.getLanguesEcrites();
    const diplomes = this.getDiplomes();
    const fonctionAnterieures = this.getFonctionAnterieuress();

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
        image: formData.image,
        url: formData.url
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
        circonscription: situationMilitanteFormData.circonscription,
        region: situationMilitanteFormData.region,
        commune: situationMilitanteFormData.commune,
        depart: situationMilitanteFormData.depart,
        village: situationMilitanteFormData.village,
        numeroCentreVote: situationMilitanteFormData.numeroCentreVote,
        numeroBureauVote: situationMilitanteFormData.numeroBureauVote
      },
      situationProf: {
        professionActuelle: situationProfFormData.professionActuelle,
        fonctionActuelle: situationProfFormData.fonctionActuelle,
        niveauEtude: situationProfFormData.niveauEtude,
        fonctionAnterieures:fonctionAnterieures,
        diplomes: diplomes, // Initialize with one field
        specialisation: situationProfFormData.specialisation,
        langueParlees: langueParlees,
        langueEcrites: langueEcrites,
        autres: situationProfFormData.autres
      }
    }

    console.log("update")
    console.log(data)
    console.log(data.situationProf)
    console.log("update")

    this.patientService.updateCadre(data.id,data).subscribe((res:any)=>{
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

  onPreviousClick(stepper: any) {
    stepper.previous();
  }


  getLangues(){
    this.langueService.getLangues().subscribe((res:any) => {
      this.langues = res
      console.log(res)
   },(error:any)=>{
     if(error.error?.message){
       this.responseMessage = error.error?.message
   }
   else {
     this.responseMessage = GlobalConstants.genericErrorMessage
   }
   this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error)
   })
  }

  onSubmitClick(stepper:any) {
    if(this.dialogAction == 'Modifier'){
      if (stepper.selectedIndex === 0 && this.identificationForm.valid) {
        stepper.next();
      } else if (stepper.selectedIndex === 1 && this.situationMilitanteForm.valid) {
        // Effectuer les actions nécessaires avec les données du formulaire
        stepper.next();
      }
      else if (stepper.selectedIndex === 2 && this.situationProfForm.valid) {
        // Effectuer les actions nécessaires avec les données du formulaire
        this.edit()
        this.dialogRef.close();
      }
    }
    else {
      if (stepper.selectedIndex === 0 && this.identificationForm.valid) {
        stepper.next();
      } else if (stepper.selectedIndex === 1 && this.situationMilitanteForm.valid) {
        // Effectuer les actions nécessaires avec les données du formulaire
        stepper.next();
      }
      else if (stepper.selectedIndex === 2 && this.situationProfForm.valid) {
        // Effectuer les actions nécessaires avec les données du formulaire
        this.add()
        this.dialogRef.close();
      }
    }

  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.selectedFile = event.target.files[0]
      // Afficher un aperçu de l'image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviewUrl = e.target.result;
      };
      reader.readAsDataURL(file);

      // Mettre à jour la valeur du champ 'image' dans le formulaire
      this.identificationForm.get('image')?.setValue(file.name); // Or use file content depending on your use case
    } else {
      // Réinitialiser l'aperçu de l'image si aucun fichier n'est sélectionné
      this.imagePreviewUrl = null;
      this.identificationForm.get('image')?.setValue(null);
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



get fonctionAnterieures() {
  return this.situationProfForm.get('fonctionAnterieures') as FormArray;
}

get diplomes() {
  return this.situationProfForm.get('diplomes') as FormArray;
}

addFonctionAnterieure() {
  const fonctionAnterieuresArray = this.situationProfForm.get('fonctionAnterieures') as FormArray;
  fonctionAnterieuresArray.push(this.formBuilder.control(''));
}

removeFonctionAnterieure(index: number) {
  this.fonctionAnterieures.removeAt(index);
}

addDiplome() {
  const diplomesArray = this.situationProfForm.get('diplomes') as FormArray;
  diplomesArray.push(this.formBuilder.control(''));
}

removeDiplome(index: number) {
  this.diplomes.removeAt(index);
}

onProfessionActuelleChange() {
  const fonctionActuelleControl = this.situationProfForm.get('fonctionActuelle');

  if (this.situationProfForm.get('professionActuelle').value == 'false') {
    fonctionActuelleControl.setValue('');
    fonctionActuelleControl.clearValidators();
  } else {
    fonctionActuelleControl.setValidators([Validators.required]);
  }

  fonctionActuelleControl.updateValueAndValidity();
}

createDiplome(): FormGroup {
  return this.formBuilder.group({
    ecole: [''], // Set default value as needed
  });
}

createFonctionAnterieur(): FormGroup {
  return this.formBuilder.group({
    fonction: [''],
    annee: [''],// Set default value as needed
  });
}


}

