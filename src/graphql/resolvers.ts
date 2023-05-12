import { Employee } from '../schemas/employee.js';
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee
} from '../services/employeeService.js';

export const resolvers = {
  Query: {
    GetEmployeeById: async (parent: never, { id }: { id: string }) => {
      return await getEmployee(id);
    },
    GetAllEmployees: async () => {
      return await getAllEmployees();
    },
  },
  Mutation: {
    CreateEmployee: async (
      parent: never,
      { employeeData }: { employeeData: Employee }
    ) => {
      return await createEmployee(employeeData);
    },
    UpdateEmployeeById: async (
      parent: never,
      { id, employeeData }: { id: string, employeeData: Employee}
    ) => {
      return await updateEmployee(id, employeeData);
    },
    DeleteEmployeeById: async (
      parent: never,
      { id }: { id: string }
    ) => {
      return await deleteEmployee(id);
    }
  }
};
