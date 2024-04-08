import React, { useState } from 'react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    const audio = document.getElementById('audio');
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  return (
    <div>
      <audio id="audio" src="https://download.samplelib.com/mp3/sample-3s.mp3" loop />
      <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'} Music</button>
    </div>
  );
};

export default MusicPlayer;
