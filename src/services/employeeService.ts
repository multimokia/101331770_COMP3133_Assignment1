import { Employee } from '../schemas/employee.js';

export async function getEmployee(id: string) {
  return await Employee.findOne({_id: id});
}

export async function getAllEmployees() {
  return await Employee.find();
}

export async function createEmployee(employeeData: Employee) {
  return await new Employee({
    first_name: employeeData.first_name,
    last_name: employeeData.last_name,
    email: employeeData.email,
    salary: employeeData.salary,
    gender: employeeData.gender ?? null
  }).save();
}

export async function updateEmployee(id: string, employeeData: Employee) {
  return await Employee.findByIdAndUpdate(
    {_id: id},
    {
      first_name: employeeData.first_name,
      last_name: employeeData.last_name,
      email: employeeData.email,
      salary: employeeData.salary,
      gender: employeeData.gender ?? null
    },
    { runValidators: true }
  );
}

export async function deleteEmployee(id: string) {
  return await Employee.findByIdAndDelete({_id: id});
}
