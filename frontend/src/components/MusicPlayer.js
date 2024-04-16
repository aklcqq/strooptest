import React, { useState } from 'react';

function getSongPath(genre) {
  const genreToPathMapping = {
    jazz: '/songs/jazz_song.mp3',
    classical: '/songs/classical_song.mp3',
    rock: '/songs/rock_song.mp3',
    pop: '/songs/pop_song.mp3',
    silent: '/songs/silent.mp3',
    // Add more genres and paths as needed
  };

  // Return the path based on the genre, or a default song if the genre is unknown
  return genreToPathMapping[genre] || '/songs/silent.mp3';
}

const MusicPlayer = ({ song, autoPlay, loop }) => (
  // remove controls to hide control panel
  <audio controls src={song} autoPlay={autoPlay} loop={loop} />

);

export default MusicPlayer;
