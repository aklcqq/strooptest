import React, { useState } from 'react';

const MusicPlayer = ({ song, autoPlay, loop }) => (
  // remove controls to hide control panel
  <audio controls src={song} autoPlay={autoPlay} loop={loop} />

);

export default MusicPlayer;
