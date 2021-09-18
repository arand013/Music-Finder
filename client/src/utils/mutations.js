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
        authors
        image
        link
        title
        description
      }
    }
  }
`;

export const REMOVE_SONG = gql`
  mutation removeSong($songId: ID!) {
    removeSong(songId: $songId) {
      _id
      username
      email
      bookCount
      savedSongs {
        # _id
        songId
        authors
        image
        link
        title
        description
      }
    }
  }
`;