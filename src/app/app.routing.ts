import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { LoginComponent } from './components/login/login.component';
import { signupComponent } from './components/signup/signup.component';
import { ToolsComponent } from './components/tools/tools';
import { MaintenanceComponent } from './components/maintenance/maintenance';
import { OthersComponent } from './components/others/others';
import { FernutureComponent } from './components/fernuture/fernuture';
import { ClothesComponent } from './components/clothes/clothes';
import { ItemComponent } from './components/item/item.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AboutComponent } from './components/about/about';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: signupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'tools', component: ToolsComponent },
  { path: 'clothes', component: ClothesComponent },
  { path: 'others', component: OthersComponent },
  { path: 'fernuture', component: FernutureComponent },
  { path: 'maintenance', component: MaintenanceComponent },
  { path: 'item', component: ItemComponent },
  {path:'profiler',component:ProfileComponent},
  
  {path:'about',component:AboutComponent}
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }


export const routingComponents = [LoginComponent, signupComponent, HomeComponent, ClothesComponent, FernutureComponent, OthersComponent, MaintenanceComponent, ToolsComponent, ItemComponent,ProfileComponent,AboutComponent];
