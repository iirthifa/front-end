import { Component } from '@angular/core';
import { DepartmentRepresentation } from '../services/api/module/department-representation';
import { DepartmentService } from '../services/api/department/department.service';
import { StatusService } from '../services/api/status/status.service';
//import { EmployeeService } from '../services/api/employee/employee.service';
import { FormBuilder } from '@angular/forms';
import swal from 'sweetalert';
import { AuthIds, PermissionHelperService } from '../services/permission-helper.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent {

  departmentObj:DepartmentRepresentation = {};
  departments: Array<any> = [];
  allStatus:any;

  type:string;
  statusValue:any;
  isEditDepartment:boolean=false;
  dtDynamicVerticalScrollExample:any;

  canCreate = false;
  canUpdate = false;
  canDelete = false;

  constructor(
    private departmentService:DepartmentService,
    private statusService:StatusService,
    private permissionHelper: PermissionHelperService,
    public fb:FormBuilder
  ){}

  ngOnInit(): void {
    this.isEditDepartment = false;
    this.canCreate = this.permissionHelper.has(AuthIds.DEPARTMENT_CREATE);
    this.canUpdate = this.permissionHelper.has(AuthIds.DEPARTMENT_UPDATE);
    this.canDelete = this.permissionHelper.has(AuthIds.DEPARTMENT_DELETE);
    this.GetAllStatus();
    this.GetAllDepartments();
}


SaveDepartment():void{

    this.type = this.isEditDepartment==false?'Add':'Update';
    if(this.type=='Add'){
      swal({
        title: "Are you sure?",
        text: "That you want to Add this details?",
        icon: "warning",
        dangerMode: true,
      })
      .then(willDelete => {
        if (willDelete) {
          this.departmentService.createDepartment(this.departmentObj,this.type)
          .subscribe({
            next:(result):void=>{
              this.GetAllDepartments();  
            }
          });
          swal("Sucessfull!", "Department has been Adedd!", "success");
        }
       
      });
    }else{
      console.log(this.departmentObj);
      
      this.departmentService.createDepartment(this.departmentObj,this.type)
          .subscribe({
            next:(result):void=>{
              this.GetAllDepartments();  
            }
          });
      swal("Sucessfull!", "Department has been updated!", "success");

  
    }

    
}

GetDepartmentById(ID:any){
  this.departmentService.GetDepartmentsById(ID).subscribe(allData=>{ 
  this.departmentObj = allData.data.dataList[0];

  this.isEditDepartment = true;
  this.statusValue=allData.data.dataList[0].status.name;
  this.departmentObj.status = allData.data.dataList[0].status.id;
  
})
}

GetAllDepartments(){
  this.departmentService.GetAllDepartments().subscribe(allData=>{
    this.departments = allData?.data?.dataList || [];
  })
}

DeleteById(ID:any){

    swal({
      title: "Are you sure",
      text: "That you want to Delete this Department?",
      icon: "warning",
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        swal("Deleted!", "Department has been deleted!", "success");
        this.departmentService.DeleteDepartmentById(ID).subscribe(allData=>{
          this.GetAllDepartments();
        })
      }
    });

}

GetAllStatus(){
  this.statusService.GetAllStatus().subscribe(allData=>{
    this.allStatus = allData.data.dataList; 
    
  })
}

onChangeStatus(E:any){
  this.departmentObj.status = E.target.value;
  
}

}
