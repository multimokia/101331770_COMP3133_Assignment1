import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    # NOTE: password should never be exposed
  }

  type Employee {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String
    salary: Float!
  }

  type Query {
    Login(username: String!, password: String!): User!
    GetEmployeeById(id: ID!): Employee!
    GetAllEmployees: [Employee]!
  }

  input EmployeeInput {
    first_name: String!,
    last_name: String!,
    email: String!,
    salary: Float!,
    gender: String
  }

  type Mutation {
    Signup(username: String!, email: String!, password: String!): User!
    CreateEmployee(employeeData: EmployeeInput): Employee!
    UpdateEmployeeById(id: ID!, employeeData: EmployeeInput): Employee!
    DeleteEmployeeById(id: ID!): Employee!
  }
`;
