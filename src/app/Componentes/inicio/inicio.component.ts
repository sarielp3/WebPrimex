import { Component, OnInit } from '@angular/core';
import { EquipoService,Equipo } from '../../Servicio/equipo.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers:[EquipoService]
})
export class InicioComponent implements OnInit {

  empleado: Equipo={
    idempleado:'',
    nombres:'',
    ap_pat:'',
    ap_mat:'',
    calle:'',
    colonia:'',
    ciudad:'',
    municipio:'',
    telefono:''
  }
  empleados : Equipo[] = [];
  constructor(private Equiposervice:EquipoService, private router:Router) { }

  ngOnInit(): void {
    this.listarEmpleados();
  }

  listarEmpleados(){
    this.Equiposervice.getall().subscribe(
      (res)=>{
        this.empleados=<any>res;
        console.log(res);
      },
      err => console.log(err)
    );
  }

  ModificarEmple(id:string){
    this.router.navigate(['/Modificar/' + id]);
}

EliminarEmple(id:string){
this.Equiposervice.EliminarEmpleado(id).subscribe(
  (res)=>{
    this.listarEmpleados();
  },
  err => console.log(err)
);
}

filtrar(){
var nombres,paterno,materno;
  if(this.empleado.nombres == "" && this.empleado.ap_pat == "" && this.empleado.ap_mat == ""){
    this.listarEmpleados();
  }
  else{
    nombres = this.empleado.nombres;
    paterno = this.empleado.ap_pat;
    materno = this.empleado.ap_mat;

    if(nombres== ""){
      nombres = "a";
    }
    if(paterno == ""){
      paterno = "a";
    }
    if(materno == ""){
      materno = "a";
    }
    this.Equiposervice.filtrar_empleados(nombres,paterno,materno).subscribe(
    res=>{
      
      this.empleados=<any>res;
    },
    err => console.log(err)

  );
  }
  
}

limpiar(){
    this.empleado.ap_mat = "";
    this.empleado.ap_pat = "";
    this.empleado.nombres = "";
}


}
