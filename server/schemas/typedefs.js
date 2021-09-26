// import the gql tagged template function (they are an advanced use if template literals)
const { gql } = require("apollo-server-express");

const typeDefs = gql`
type Query {
  me: User
}
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveSong(input: savedSong!): User
    removeSong(trackId: ID!): User
  }
  type User {
    _id: ID!
    username: String
    email: String
    songCount: Int
    savedSongs: [Song]
  }
  type Song {
    trackId: String
    artistName: [String]
    trackName: String
    artworkUrl100: String
  }
  input savedSong {
    trackId: String!
    artistName: [String]
    trackName: String
    artworkUrl100: String
  }
  type Auth {
    token: ID!
    user: User
  }

`;



// export the typeDefs
module.exports = typeDefs;

