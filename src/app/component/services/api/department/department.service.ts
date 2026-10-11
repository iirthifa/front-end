import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DepartmentRepresentation } from '../module/department-representation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private baseUrl : string= 'http://localhost:8010/api/v1/department'; 

  constructor(
    private http:HttpClient
  ) { }

  createDepartment(department:any,type:any):Observable<any>{
      if(type=='Add'){
        return this.http.post(this.baseUrl,department);
      }else{
        return this.http.put(this.baseUrl+"/"+department.id,department);
    }
        
  }

  GetAllDepartments():Observable<any>{
    return this.http.get(this.baseUrl);
  }

  GetDepartmentsById(ID:any):Observable<any>{
    return this.http.get(this.baseUrl+"/"+ID);
  }

  DeleteDepartmentById(ID:any):Observable<any>{
    return this.http.delete(this.baseUrl+"/"+ID)
  }


}
