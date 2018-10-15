import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './/app-routing.module';


//components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PreciosComponent } from './components/precios/precios.component';
import { ProtegidaComponent } from './components/protegida/protegida.component';
import {AppLoadingComponent} from './components/app-loading/app-loading.component';



//services
import { AuthService } from './services/auth.service';
import { AuthguardService } from './services/authguard.service';
import { CallbackComponent } from './components/callback/callback.component';
import { CrearProyectoComponent } from './components/crear-proyecto/crear-proyecto.component';
import { TusProyectosComponent } from './components/tus-proyectos/tus-proyectos.component';
import { UnirseProyectoComponent } from './components/unirse-proyecto/unirse-proyecto.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//angular material
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PreciosComponent,
    ProtegidaComponent,
    CallbackComponent,
    AppLoadingComponent,
    CrearProyectoComponent,
    TusProyectosComponent,
    UnirseProyectoComponent,
    CuentaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    AuthService,
    AuthguardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
