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

import Auth from "../utils/auth";
import { searchGoogleSongs } from "../utils/API";
import { saveSongIds, getSavedSongsIds } from "../utils/localStorage";
import { useMutation } from "@apollo/react-hooks";
import { SAVE_SONG } from "../utils/mutations";

const SearchSongs = () => {
  // create state for holding returned google api data
  const [searchedSongs, setSearchedSongs] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");
  const [saveSong, { error }] = useMutation(SAVE_SONG);
  // create state to hold saved songId values
  const [savedSongIds, setSavedSongIds] = useState(getSavedSongsIds());

  
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
        artistId: song.artistId,
        artistName: song.volumeInfo.artistName || ["No author to display"],
        collectionName: song.volumeInfo.collectionName,
        collectionViewUrl: song.volumeInfo.imageLinks?.thumbnail || "",
      }));

      setSearchedSongs(songData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a book to our database
  const handleSaveSong = async (songId) => {
    // find the book in `searchedBooks` state by the matching id
    const songToSave = searchedSongs.find((song) => song.songId === songId);

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
      setSavedSongIds([...savedSongIds, songToSave.songId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Search for Songs!</h1>
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
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedSongs.length
            ? `Viewing ${searchedSongs.length} results:`
            : "Search for a song to begin"}
        </h2>
        <CardColumns>
          {searchedSongs.map((song) => {
            return (
              <Card key={song.songId} border="dark">
                {song.image ? (
                  <Card.Img
                    src={song.image}
                    alt={`The cover for ${song.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{song.title}</Card.Title>
                  <p className="small">Authors: {song.authors}</p>
                  <Card.Text>{song.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedSongIds?.some(
                        (savedSongId) => savedSongId === song.songId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveSong(song.songId)}
                    >
                      {savedSongIds?.some(
                        (savedSongId) => savedSongId === song.songId
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
    </>
  );
};

export default SearchSongs;