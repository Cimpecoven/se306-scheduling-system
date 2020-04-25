import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { EventviewComponent } from './eventview/eventview.component';
import { EventeditComponent } from './eventedit/eventedit.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginComponent } from './login/login.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { FoodviewComponent } from './foodview/foodview.component';
import { UserPortalComponent } from './user-portal/user-portal.component';
import { RoomsComponent } from './rooms/rooms.component';


const routes: Routes = [
  {path:'', redirectTo: '/main', pathMatch: 'full'},
  {path: 'main', component: MainComponent},
  {path: 'about', component: AboutComponent},
  {path: 'eventview', component: EventviewComponent},
  {path: 'eventedit', component: EventeditComponent},
  {path: 'account', component: CreateAccountComponent},
  //{path: 'login', component: LoginComponent}
  {path: 'createEvent', component: CreateEventComponent},
  {path: 'foodview', component: FoodviewComponent},
  {path: 'user-portal', component: UserPortalComponent},
  {path: 'rooms', component: RoomsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
