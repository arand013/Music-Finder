import gql from "graphql-tag";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
<<<<<<< HEAD
      bookCount
      savedBooks {
        bookId
        authors
        image
        link
=======
      songCount
      savedSongs {
        bookId
        authors
        link
        image
>>>>>>> develop
        title
        description
      }
    }
  }
`;