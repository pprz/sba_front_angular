import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent,LoginComponent} from './components';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'home',
  component:HomeComponent,
  // children:[
  //     {
  //     path:'',
  //     // redirectTo:'/' 
  //     }
  //   ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
