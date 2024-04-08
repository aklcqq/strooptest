import React, { useState } from 'react';

const MusicPlayer = ({ song, autoPlay, loop }) => (
  <audio src={song} autoPlay={autoPlay} loop={loop} />

);

export default MusicPlayer;
