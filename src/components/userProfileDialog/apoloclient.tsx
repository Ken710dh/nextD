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
      }
    }
  }
`;

export const UPDATE_USER_BY_USER_ID = gql`
  mutation UpdateUserByUserId($input: UpdateUserByUserIdInput!) {
    updateUserByUserId(input: $input) {
      user {
        fullname
        email
        roleuser
        status
      }
    }
  }
`;