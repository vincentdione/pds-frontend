import { PatientService } from './../../services/patient.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-manage-detail-cadre',
  templateUrl: './manage-detail-cadre.component.html',
  styleUrls: ['./manage-detail-cadre.component.scss']
})
export class ManageDetailCadreComponent implements OnInit {

  cadre:any;


  constructor(private route: ActivatedRoute,private router: Router,private cadreService:PatientService) { }

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

}
