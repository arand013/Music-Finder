<<<<<<< HEAD
export const getSavedBookIds = () => {
    const savedBookIds = localStorage.getItem('saved_books')
      ? JSON.parse(localStorage.getItem('saved_books'))
      : [];
  
    return savedBookIds;
  };
  
  export const saveBookIds = (bookIdArr) => {
    if (bookIdArr.length) {
      localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
    } else {
      localStorage.removeItem('saved_books');
    }
  };
  
  export const removeBookId = (bookId) => {
    const savedBookIds = localStorage.getItem('saved_books')
      ? JSON.parse(localStorage.getItem('saved_books'))
      : null;
  
    if (!savedBookIds) {
      return false;
    }
  
    const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
    localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));
  
    return true;
  };
=======
export const getSavedSongsIds = () => {
    const savedSongIds = localStorage.getItem('saved_songs')
      ? JSON.parse(localStorage.getItem('saved_songs'))
      : [];
  
    return savedSongIds;
  };
  
  export const saveSongIds = (songIdArr) => {
    if (songIdArr.length) {
      localStorage.setItem('saved_songs', JSON.stringify(songIdArr));
    } else {
      localStorage.removeItem('saved_songs');
    }
  };
  
  export const removeSongId = (songId) => {
    const savedSongIds = localStorage.getItem('saved_songs')
      ? JSON.parse(localStorage.getItem('saved_songs'))
      : null;
  
    if (!savedSongIds) {
      return false;
    }
  
    const updatedSavedSongIds = savedSongIds?.filter((savedSongId) => savedSongId !== songId);
    localStorage.setItem('saved_songs', JSON.stringify(updatedSavedSongIds));
  
    return true;
  };
>>>>>>> develop
