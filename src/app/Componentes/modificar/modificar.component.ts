import { Component, OnInit } from '@angular/core';
import {Equipo,EquipoService} from '../../Servicio/equipo.service';
import {Router,ActivatedRoute} from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {

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

  constructor(private EquipoService:EquipoService,private router:Router,private activeRoute:ActivatedRoute) {
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
    const id_entrada = <string>this.activeRoute.snapshot.params.id;
    if(id_entrada){
      this.EquipoService.getallxid(id_entrada).subscribe(
        res=>{
          this.empleado = res[0]
          //console.log(res[0])
        },
        err => console.log(err)
        
      );
    }
  }

  modificar(){
    if(this.agregarform.valid){

      this.EquipoService.ModificarEmpleado(this.empleado.idempleado || '', this.empleado).subscribe(
        res=>{
          
          console.log(res);
        },
        err => console.log(err)
  
      );
      this.router.navigate(['/Inicio']);
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
