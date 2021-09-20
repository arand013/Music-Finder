import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
<<<<<<< HEAD
export const SAVE_BOOK = gql`
  mutation saveBook($input: savedBook!) {
    saveBook(input: $input) {
      _id
      username
      email
      bookCount
      savedBooks {
        # _id
        bookId
=======
export const SAVE_SONG = gql`
  mutation saveSong($input: savedSong!) {
    saveSong(input: $input) {
      _id
      username
      email
      songCount
      savedSongs {
        # _id
        songId
>>>>>>> develop
        authors
        image
        link
        title
        description
      }
    }
  }
`;

<<<<<<< HEAD
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
=======
export const REMOVE_SONG = gql`
  mutation removeSong($songId: ID!) {
    removeSong(songId: $songId) {
>>>>>>> develop
      _id
      username
      email
      bookCount
<<<<<<< HEAD
      savedBooks {
        # _id
        bookId
=======
      savedSongs {
        # _id
        songId
>>>>>>> develop
        authors
        image
        link
        title
        description
      }
    }
  }
<<<<<<< HEAD
`;
=======
`;
>>>>>>> develop
