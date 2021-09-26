// import the gql tagged template function (they are an advanced use if template literals)
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveSong(input: savedSong!): User
    removeSong(songId: ID!): User
  }
  type User {
    _id: ID!
    username: String!
    email: String
    songCount: Int
    savedSongs: [Song]
  }
  type Song {
    trackId: ID!
    artistName: [String]
    trackName: String!
    artworkUrl100: String
  }
  input savedSong {
    trackId: String!
    artistName: [String]
    trackName: String!
    artworkUrl100: String
  }
  type Query {
    me: User
  }
  type Auth {
    token: ID!
    user: User
  }

`;



// export the typeDefs
module.exports = typeDefs;

