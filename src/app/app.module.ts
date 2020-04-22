import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
// import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatInputModule, MatSidenavModule, MatToolbarModule, MatButtonModule, MatDialogModule, MatCheckboxModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { FoodviewComponent } from './foodview/foodview.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AboutComponent,
    CreateAccountComponent,
    EquipmentComponent,
    LoginComponent,
    CreateEventComponent,
    FoodviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.FirebaseFirestore),
    // AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatInputModule, 
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent]
})
export class AppModule { }
