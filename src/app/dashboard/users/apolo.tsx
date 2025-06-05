'use client'
import { gql } from '@apollo/client';


export const GET_USERS = gql`
  query GetUsers {
    allUsers {
      nodes {
        userId
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
  mutation DeleteUserByUserId($input: DeleteUserByUserIdInput!) {
    deleteUserByUserId(input: $input) {
      deletedUserId
      user {
        userId
      }
    }
  }
`;