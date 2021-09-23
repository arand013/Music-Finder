// import the gql tagged template function (they are an advanced use if template literals)
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String
    songCount: Int
    savedSongs: [Song]
  }
  type Song {
    # _id
    artistName: String
    trackId: String
    trackName: String
    artworkUrl100: String
  }
  input savedSong {
    # _id
    artistName: String
    trackId: String
    trackName: String
    artworkUrl100: String
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveSong(input: savedSong!): User
    removeSong(songId: ID!): User
  }

`;



// export the typeDefs
module.exports = typeDefs;

