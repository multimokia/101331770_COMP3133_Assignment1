import { createEmployee, deleteEmployee, getAllEmployees, getEmployee, updateEmployee } from '../services/employeeService.js';
import { loginUser, registerUser } from '../services/userService.js';

export const resolvers = {
  Query: {
    Login: async (parent: any, args: any, context: any, info: any) => {
      return await loginUser(args.username, args.password);
    },
    GetEmployeeById: async (parent: any, args: any, context: any, info: any) => {
      return await getEmployee(args.id);
    },
    GetAllEmployees: async () => {
      return await getAllEmployees();
    }
  },
  Mutation: {
    Signup: async (parent: any, args: any, context: any, info: any) => {
      return await registerUser(args);
    },
    CreateEmployee: async (parent: any, args: any, context: any, info: any) => {
      return await createEmployee(args.employeeData);
    },
    UpdateEmployeeById: async (parent: any, args: any, context: any, info: any) => {
      return await updateEmployee(args.id, args.employeeData);
    },
    DeleteEmployeeById: async (parent: any, args: any, context: any, info: any) => {
      return await deleteEmployee(args.id);
    }
  }
};
