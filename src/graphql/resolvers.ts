import { Employee } from '../schemas/employee.js';
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee
} from '../services/employeeService.js';
import { GraphQLError } from 'graphql';
import { verifyUserToken } from '../services/jwt.js';

export const resolvers = {
  Query: {
    // Login: async (parent: never, { username, password }: { username: string, password: string }) => {
    //   return await loginUser(username, password);
    // },
    GetEmployeeById: async (parent: never, { id }: { id: string }) => {
      return await getEmployee(id);
    },
    GetAllEmployees: async () => {
      return await getAllEmployees();
    },
  },
  Mutation: {
    // Requires no authentication
    // Signup: async (parent: never, args: UserType) => {
    //   return await registerUser(args);
    // },
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
