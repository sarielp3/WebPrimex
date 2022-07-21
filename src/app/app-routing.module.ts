import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './Componentes/inicio/inicio.component';
import {AgregarComponent} from './Componentes/agregar/agregar.component';
import {ModificarComponent} from './Componentes/modificar/modificar.component';

const routes: Routes = [
  {path:'' ,redirectTo:'Inicio',pathMatch:'full'},
  {path:'Inicio', component:InicioComponent},
  {path:'Modificar/:id', component:ModificarComponent},
  {path:'Agregar', component:AgregarComponent}

];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
