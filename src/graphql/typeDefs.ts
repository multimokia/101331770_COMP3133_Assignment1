import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    token: String
    # NOTE: password should never be exposed, hence it is not included here as a field
  }

  type Employee {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String
    salary: Float!
  }

  input EmployeeInput {
    first_name: String!,
    last_name: String!,
    email: String!,
    salary: Float!,
    gender: String
  }

  type Query {
    GetEmployeeById(id: ID!): Employee
    GetAllEmployees: [Employee]!
    ValidateLogin: Boolean
  }

  type Mutation {
    CreateEmployee(employeeData: EmployeeInput): Employee
    UpdateEmployeeById(id: ID!, employeeData: EmployeeInput): Employee
    DeleteEmployeeById(id: ID!): Employee
  }
`;
