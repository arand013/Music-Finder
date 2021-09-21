import React from "react";
import {
  Jumbotron,
  Container,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";

// import { deleteBook } from '../utils/API';
import Auth from "../utils/auth";
import { removeSongId } from "../utils/localStorage";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { REMOVE_SONG } from "../utils/mutations";
import { GET_ME } from "../utils/queries";

const SavedSongs = () => {
  // const [userData, setUserData] = useState({});
  const [removeSong, { error }] = useMutation(REMOVE_SONG);
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};

  const handleDeleteSong = async (songId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeSong({
        variables: { songId },
      });

      console.log(data);

      if (error) {
        throw new Error("Something went wrong!");
      }

      // upon success, remove song's id from localStorage
      removeSongId(songId);
    } catch (err) {
      console.error(err);
      
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved songs!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedSongs.length
            ? `Viewing ${userData.savedSongs.length} saved ${
                userData.savedSongs.length === 1 ? "song" : "songs"
              }:`
            : "You have no saved songs!"}
        </h2>
        <CardColumns>
          {userData.savedSongs.map((song) => {
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
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteSong(song.songId)}
                  >
                    Delete this!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedSongs;