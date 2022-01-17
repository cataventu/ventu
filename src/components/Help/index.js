import React, { useState } from 'react';
import { HelpCircle } from 'react-feather';
import SublimeVideo from 'react-sublime-video';

import video from '../../videos/projeto-rsvp.mp4';

const Help = ({ title, color, description }) => {
  const [display, setDisplay] = useState('hide');
  const classButton = `ml-3 mt-0 float-right btn button-shadow btn-${color}`;

  function handlePlayer() {
    setDisplay('hide');
    document.getElementById('player').pause();
  }

  return (
    <>
      <button type="button" className={classButton} title={title} onClick={() => setDisplay(' show')}>
        <HelpCircle size={18} className="align-middle mr-2" />
        {description}
      </button>
      <div className={`video-player ${display}`}><SublimeVideo id="player" src={video} /></div>
      <div className={`video-help ${display}`} onClick={() => handlePlayer()} />
    </>
  );
};

export default Help;
