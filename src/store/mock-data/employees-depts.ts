import {Employee, Department, ConfigData} from '../models/employee-dept';

export const MOCK_EMPLOYEES: Employee[] = [
  {empid: 1, name: 'John Smith', title: 'CEO', deptid: 3},
  {empid: 2, name: 'Raj Reddy', title: 'Sysadmin', deptid: 2},
  {empid: 3, name: 'Jason Bourne', title: 'Developer', deptid: 2},
  {empid: 4, name: 'Jane Smith', title: 'Sale Manager', deptid: 1},
  {empid: 5, name: 'Rita Patel', title: 'DBA', deptid: 2},
];

export const MOCK_DEPARTMENTS: Department[] = [
  {deptid: 1, name: 'Sales', location: 'Los Angeles'},
  {deptid: 2, name: 'Technology', location: 'San Jose'},
  {deptid: 3, name: 'Marketing', location: 'Los Angeles'},
];

export const MOCK_CONFIGS: ConfigData[] = [
  {configid: 1, name: 'Welcome', value: 'false'},
];