import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";

import Auth from "../utils/auth";
import { searchGoogleSongs } from "../utils/API";
import { saveSongIds, getSavedSongsIds } from "../utils/localStorage";
import { SAVE_SONG } from "../utils/mutations";

const SearchSongs = () => {
  // create state for holding returned google api data
  const [searchedSongs, setSearchedSongs] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");
  // create state to hold saved songId values
  const [savedSongIds, setSavedSongIds] = useState(getSavedSongsIds());

  const [saveSong, { error }] = useMutation(SAVE_SONG);
  
  useEffect(() => {
    return () => saveSongIds(savedSongIds);
  });

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleSongs(searchInput);
      console.log(response)
      if (!response.ok) {
        throw new error("something went wrong!");
      }

      const { results } = await response.json();
      
      console.log(results) 

      const songData = results.map((song) => ({

        trackId: song.trackId,
        artistName: song.artistName || ["No artist to display"],
        trackName: song.trackName,
        artworkUrl100: song.artworkUrl100 || ["Sorry, no image"],
        songCount: song.songCount
      }));
      console.log(songData);

      setSearchedSongs(songData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a book to our database
  const handleSaveSong = async (trackId) => {
    // find the book in `searchedBooks` state by the matching id
    const songToSave = searchedSongs.find((song) => song.trackId === trackId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await saveSong({
        variables: { body: songToSave },
      });
      console.log(saveSongIds);
      
      // if book successfully saves to user's account, save book id to state
      setSavedSongIds([...savedSongIds, songToSave.trackId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <body style={{  fontFamily: "-moz-initial" , backgroundImage: "url( https://www.teahub.io/photos/full/30-305786_background-music-cover-art.jpg)", backgroundSize: "cover" ,backgroundRepeat: "no-repeat, repeat" }}>
    {/* style={{            }} */}
      <Jumbotron fluid style={{  margin: "auto ", width: "80%", padding: "95px" , botomPadding: "0px" , fontFamily: "-moz-initial", backgroundImage: "url( https://www.teahub.io/photos/full/30-305786_background-music-cover-art.jpg)"}} className="text-light">
        <Container>
          <h1 style={{ textAlign: "center", fontFamily: "-moz-initial" }}
          >Search for Songs!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a song"
                />
              </Col >
              <Col xs={12} md={4}>
                <Button type="submit" variant="warning" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container fluid style={{ leftPadding: "0px", margin: "0px" }} >
        <h2 style={{  padding: "150px", color: "white", textAlign: "center", fontFamily: "-moz-initial", fontSize: "80px" }}>
          {searchedSongs.length
            ? `Viewing ${searchedSongs.length} results:`
            : "Let's start looking for songs"}
        </h2>
        <CardColumns style={{            }} >
          {searchedSongs.map((song) => {
            return (
              <Card key={song.trackId} border="dark">
                {song.artworkUrl100 ? (
                  <Card.Img
                    src={song.artworkUrl100}
                    alt={`The cover for ${song.trackName}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{song.trackName}</Card.Title>
                  <p className="small">Artists: {song.artistName}</p>
                  
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedSongIds?.some(
                        (savedSongId) => savedSongId === song.trackId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveSong(song.trackId)}
                    >
                      {savedSongIds?.some(
                        (savedSongId) => savedSongId === song.trackId
                      )
                        ? "This song has already been saved!"
                        : "Save this Song!"}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
      </body>
    </>
  );
};

export default SearchSongs;