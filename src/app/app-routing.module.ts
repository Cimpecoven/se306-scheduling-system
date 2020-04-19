import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { CreateAccountDialogComponent } from './account/create-account-dialog.component';


const routes: Routes = [
  {path:'', redirectTo: '/main', pathMatch: 'full'},
  {path: 'main', component: MainComponent},
  {path: 'about', component: AboutComponent},
  {path: 'account', component: CreateAccountDialogComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
