import { Component, OnInit } from '@angular/core';
import {Equipo,EquipoService} from '../../Servicio/equipo.service';
import {Router} from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

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

  constructor(private EquipoService:EquipoService,private router:Router) {
    this.agregarform = this.createformgroup();
   }

   createformgroup(){
    return new FormGroup({
      nombres: new FormControl('',[Validators.required, Validators.minLength(3)]),
      ap_pat: new FormControl('',[Validators.required,Validators.minLength(3)]),
      ap_mat: new FormControl('',[Validators.required,Validators.minLength(3)]),
      calle: new FormControl('',[Validators.required,Validators.minLength(3)]),
      colonia: new FormControl('',[Validators.required,Validators.minLength(3)]),
      ciudad: new FormControl('',[Validators.required,Validators.minLength(3)]),
      municipio: new FormControl('',[Validators.required,Validators.minLength(3)]),
      telefono: new FormControl('',[Validators.required,Validators.minLength(7)])

    });
  }

  agregarform: FormGroup;

  ngOnInit(): void {
  }

  agregar(){
    if(this.agregarform.valid){
      
      console.log('Valido');
      delete this.empleado.idempleado;
      this.EquipoService.RegistrarEmpleado(this.empleado).subscribe();
      this.router.navigate(['/Inicio']);
    }else{
      console.log('no valido');
      
    }
    
  }

  get nombres(){ return this.agregarform.get('nombres')};
  get ap_pat(){ return this.agregarform.get('ap_pat')};
  get ap_mat(){ return this.agregarform.get('ap_mat')};
  get calle(){ return this.agregarform.get('calle')};
  get colonia(){ return this.agregarform.get('colonia')};
  get ciudad(){ return this.agregarform.get('ciudad')};
  get municipio(){ return this.agregarform.get('municipio')};
  get telefono(){ return this.agregarform.get('telefono')};

}
