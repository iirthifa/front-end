export interface StatusRepresentation {
  id?: string | number;
  name?: string;
}

export interface EmployeeRepresentation {
    id?: string | number; 
    firstName?: string; 
    lastName?: string;
}

export interface DepartmentRepresentation {
  id?: string | number;
  deptCode?: string;
  deptName?: string;
  description?: string;
  /** Request: headEmployee id. Response: { id, firstName, lastName } */
  headEmployee?: any; 
  /** Request: status id. Response: { id, name } */
  status?: any;
}
