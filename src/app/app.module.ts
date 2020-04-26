import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { MatInputModule,
         MatSidenavModule, 
         MatToolbarModule, 
         MatButtonModule, 
         MatDialogModule, 
         MatCheckboxModule, 
         MatTableModule, 
         MatPaginatorModule, 
         MatDatepickerModule, 
         MatNativeDateModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { EventviewComponent } from './eventview/eventview.component';
import { EventeditComponent } from './eventedit/eventedit.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginComponent } from './login/login.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { FoodviewComponent } from './foodview/foodview.component';
import { FoodeditComponent } from './foodedit/foodedit.component';
import { RoomsComponent } from './rooms/rooms.component';
import { CreateFoodItemComponent } from './create-food-item/create-food-item.component';
import { UserPortalComponent } from './user-portal/user-portal.component';
import { MenuComponent } from './menu/menu.component';
import { CreateEquipmentComponent } from './create-equipment/create-equipment.component';
import { EquipmentviewComponent } from './equipmentview/equipmentview.component';
import { EquipmenteditComponent } from './equipmentedit/equipmentedit.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AboutComponent,
    EventviewComponent,
    EventeditComponent,
    CreateAccountComponent,
    LoginComponent,
    CreateEventComponent,
    FoodviewComponent,
    FoodeditComponent,
    CreateFoodItemComponent,
    UserPortalComponent,
    RoomsComponent,
    MenuComponent,
    EquipmentviewComponent,
    CreateEquipmentComponent,
    EquipmenteditComponent
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
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, FoodeditComponent, CreateFoodItemComponent, CreateEquipmentComponent, EquipmenteditComponent]
})
export class AppModule { }
