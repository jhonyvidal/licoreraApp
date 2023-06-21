export class Employee {
  empid!: number;
  name!: string;
  title?: string;
  deptid!: number;
}
export class Department {
  deptid!: number;
  name!: string;
  location?: string;
}
export class EmployeeData {
  empid!: number;
  name!: string;
  title?: string;
  department!: Department;
}

export class ConfigData {
  id!: number;
  name!: string;
  data!: string;
}

/*export class OutEvent {
  from!: string;
  employee!: EmployeeData;
}
*/
