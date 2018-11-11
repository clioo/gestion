import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './/app-routing.module';

//environment
import { environment } from '../environments/environment';

//components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PreciosComponent } from './components/precios/precios.component';
import { ProtegidaComponent } from './components/protegida/protegida.component';
import {AppLoadingComponent} from './components/app-loading/app-loading.component';

//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

//services
import {ChatService} from './services/chat.service';
import { AuthService } from './services/auth.service';
import { AuthguardService } from './services/authguard.service';
import { CallbackComponent } from './components/callback/callback.component';
import { CrearProyectoComponent } from './components/crear-proyecto/crear-proyecto.component';
import { TusProyectosComponent } from './components/tus-proyectos/tus-proyectos.component';
import { UnirseProyectoComponent } from './components/unirse-proyecto/unirse-proyecto.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfiguracionComponent } from './components/tus-proyectos/configuracion/configuracion.component';
import { AsignarTareaComponent, AsignarTareaModal } from './components/tus-proyectos/asignar-tarea/asignar-tarea.component';
import { TuEquipoComponent } from './components/tus-proyectos/tu-equipo/tu-equipo.component';
import { TareasComponent } from './components/tus-proyectos/tareas/tareas.component';
import { InboxComponent } from './components/tus-proyectos/inbox/inbox.component';

//angular material
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatChipsModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';

//full callendar
import { FullCalendarModule } from 'ng-fullcalendar';
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
    CuentaComponent,
    ConfiguracionComponent,
    AsignarTareaComponent,
    TuEquipoComponent,
    TareasComponent,
    InboxComponent,
    AsignarTareaModal
  ],
  entryComponents:[AsignarTareaModal],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    FullCalendarModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [
    AuthService,
    AuthguardService,
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
