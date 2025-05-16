import React, { useState } from 'react';
import { ReactMic } from 'react-mic';

function Recorder() {
  const [recording, setRecording] = useState(false);
  const [blobURL, setBlobURL] = useState('');

  const start = () => setRecording(true);
  const stop = () => setRecording(false);

  const onStop = (recordedData) => {
    setBlobURL(recordedData.blobURL);
  };

  return (
    <div>
      <h3>🎤 Practice Speaking</h3>
      <ReactMic
        record={recording}
        className="sound-wave"
        onStop={onStop}
        strokeColor="#00BFFF"
        backgroundColor="#fff"
      />
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      {blobURL && (
        <div>
          <h4>Playback</h4>
          <audio src={blobURL} controls />
        </div>
      )}
    </div>
  );
}

export default Recorder;
