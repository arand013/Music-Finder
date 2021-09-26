export const getSavedSongIds = () => {
    const savedSongIds = localStorage.getItem('saved_songs')
      ? JSON.parse(localStorage.getItem('saved_songs'))
      : [];
  
    return savedSongIds;
  };
  
  export const saveSongIds = (trackIdArr) => {
    if (trackIdArr.length) {
      localStorage.setItem('saved_songs', JSON.stringify(trackIdArr));
    } else {
      localStorage.removeItem('saved_songs');
    }
  };
  
  export const removeSongId = (trackId) => {
    const savedSongIds = localStorage.getItem('saved_songs')
      ? JSON.parse(localStorage.getItem('saved_songs'))
      : null;
  
    if (!savedSongIds) {
      return false;
    }
  
    const updatedSavedSongIds = savedSongIds?.filter((savedSongId) => savedSongId !== trackId);
    localStorage.setItem('saved_songs', JSON.stringify(updatedSavedSongIds));
  
    return true;
  };
