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
        status
        createAt
      }
    }
  }
`;
