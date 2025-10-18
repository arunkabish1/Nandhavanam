import React, { useEffect, useRef } from "react";
import Maya from "../assets/Maya.mp3"; // Ensure this is the correct path to your audio file

const AudioPlayer = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    // Play the audio as soon as the component is mounted
    const audio = audioRef.current;
    audio.play();

    // Pause the audio after 5 seconds
    const timer = setTimeout(() => {
      audio.pause();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <audio ref={audioRef}>
  <source src={Maya} type="audio/mp3" />
  Your browser does not support the audio element.
</audio>
    </div>
  );
};

export default AudioPlayer;
