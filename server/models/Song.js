const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const songSchema = new Schema({
  artistName: {
    type: String,
    required: true,
  },
  // saved track id from GoogleBooks
  trackId: {
    type: String,
    required: true,
  },
  trackName: {
    type: String,
    required: true,
  },
  artworkUrl100: {
    type: String,
  }
});

module.exports = songSchema;