'use client'
import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        fullname
        email
        roleuser
        status
        password
      }
    }
  }
`;

export const UPDATE_USER_BY_EMAIL = gql`
  mutation UpdateUserByEmail($input: UpdateUserByEmailInput!) {
    updateUserByEmail(input: $input) {
      user {
        fullname
        email
        roleuser
        status
        password
      }
    }
  }
`;