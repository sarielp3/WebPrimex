import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  constructor(private http: HttpClient) { }

  getall(): Observable<any>{
    return this.http.get<any>('/api/consult');

  }

  filtrar_empleados(nom:any,pat:any,mat:any): Observable<any>{
    return this.http.get<any>('/api/filtrar/'+ nom + '&' + pat + '&' + mat );

  }

  getallxid(id:any): Observable<any>{
    return this.http.get<any>('/api/consultxid/' + id);

  }

  RegistrarEmpleado(datos:any): Observable<any>{
    return this.http.post<any>('/api/registrar',datos);

  }

  ModificarEmpleado(id:string,datos:any): Observable<any>{
    return this.http.put<any>('/api/editar/' + id,datos);

  }

  EliminarEmpleado(id:string):Observable<any>{
    return this.http.delete<any>('/api/eliminar/' + id)
  }
}

export interface Equipo{
  idempleado?:string,
  nombres?:string,
  ap_pat?:string,
  ap_mat?:string,
  calle?:string,
  colonia?:string,
  ciudad?:string,
  municipio?:string,
  telefono?:string

}
