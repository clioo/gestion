import { Component, OnInit } from '@angular/core';
import { FirestoreFirebaseService } from '../../services/firestore-firebase.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-unirse-proyecto-link',
  templateUrl: './unirse-proyecto-link.component.html',
  styleUrls: ['./unirse-proyecto-link.component.css']
})
export class UnirseProyectoLinkComponent implements OnInit {
  profile:any;
  constructor(private _authService:AuthService, private activatedRoute:ActivatedRoute, private _fsService:FirestoreFirebaseService) { }

  ngOnInit() {
    if (this._authService.userProfile) {
      this.profile = this._authService.userProfile;
      this.updateColection();
      } else {
      this._authService.getProfile((err, profile) => {
        this.profile = profile;
        this.updateColection();
      });
    }
  }
  updateColection(){
    this.activatedRoute.params.subscribe(params=>{
      console.log(params)
      this._fsService.updateDocumentoEnColeccionDeProyecto(
        params['idProyecto'], 'roles', params['idRol'],
        {
          usuario:this.profile.sub
        }
      ).then(data=>{
        console.log('Todo correcto');
      }).catch(err=>console.log(err));
    })
  }

}
