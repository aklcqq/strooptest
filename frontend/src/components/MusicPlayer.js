import React, { useState } from 'react';

function getSongPath(genre) {
  const genreToPathMapping = {
    classical: '/songs/classical.mp3',
    rock: '/songs/rock.mp3',
    silent: '/songs/silent.mp3',
    // Add more genres and paths as needed
  };

  // Return the path based on the genre, or a default song if the genre is unknown
  return genreToPathMapping[genre] || '/songs/silent.mp3';
}

const MusicPlayer = ({ song, autoPlay, loop }) => {
  // Determine if the song is 'silent' to decide on showing controls
  const showControls = song !== 'silent';

  return (
    <audio
      src={getSongPath(song)}
      autoPlay={autoPlay}
      loop={loop}
      // Conditionally render the controls attribute based on showControls
      {...(showControls ? { controls: true } : {})}
    />
  );
};


export default MusicPlayer;
