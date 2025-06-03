'use client'
import { gql } from '@apollo/client';


export const GET_USERS = gql`
  query GetUsers {
    allUsers {
      nodes {
        id
        fullname
        email
        roleuser
        lastLogin
        password
        status
        createAt
      }
    }
  }
`;

export const DELETE_SELECTED_USER = gql`
  mutation DeleteUserById($input: DeleteUserByIdInput!) {
    deleteUserById(input: $input) {
      deletedUserId
      user {
        id
      }
    }
  }
`;