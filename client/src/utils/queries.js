import gql from "graphql-tag";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      songCount
      savedSongs {
        bookId
        authors
        link
        image
        title
        description
      }
    }
  }
`;