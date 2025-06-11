'use client'
import { gql } from '@apollo/client';


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

export const GET_USERS = gql`
  query GetUsers($filter: UserFilter, $first: Int, $offset: Int) {
  allUsers( 
    first: $first,
    offset: $offset,
    filter: $filter,
  ) {
    nodes {
      userId
      fullname
      email
      roleuser
      password
      status
      createAt
    }
    totalCount
  }
}
`;
