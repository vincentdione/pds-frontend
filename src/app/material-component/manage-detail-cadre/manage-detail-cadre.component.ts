import { Observable } from 'rxjs';
import { PatientService } from './../../services/patient.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-manage-detail-cadre',
  templateUrl: './manage-detail-cadre.component.html',
  styleUrls: ['./manage-detail-cadre.component.scss']
})
export class ManageDetailCadreComponent implements OnInit {

  cadre:any;


  constructor(private route: ActivatedRoute,private router: Router,private cadreService:PatientService) { }

  selectedFile!: File;

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;



  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      if (id) {
        this.cadreService.getOneCadre(id).subscribe((res:any)=>{
          this.cadre = res;
        }
        ,(error:any)=>{

         console.log(error);
        })
      } else {
        console.log('Else :');
      }
    });
  }

  onFileSelected(event:any): void {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      const file: File = files[0];
      // Gérer le fichier sélectionné comme vous le souhaitez
      console.log('Fichier sélectionné:', file);
    }
  }

  triggerFileInput(): void {
    const fileInput: HTMLElement | null = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click(); // Déclencher le clic sur l'input de type fichier
    }
  }

  onUpload(): void {
    if (this.fileInput && this.fileInput.nativeElement.files.length > 0) {
      const imageBlob = this.fileInput.nativeElement.files[0];
      const file = new FormData();
      file.append('file', imageBlob);

      this.cadreService.uploadImages(this.cadre.id,file).subscribe((res: any) => {
        console.log(res);
      });
    }
  }

  getImageUrl(): string {
    return this.cadre.image ? this.cadreService.getImageUrl(this.cadre.image) : '../../../assets/img/profil.png';
  }

  ajouterPhoto(){

  }

}
