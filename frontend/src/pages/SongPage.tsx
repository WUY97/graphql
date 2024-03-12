import React from 'react';
import SongList from '../components/SongList';
import SongCreate from '../components/SongCreate';
import { useState } from 'react';

const SongPage: React.FC = () => {
    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        clicked ? setClicked(false) : setClicked(true);
    };

    return (
        <>
            <h1>Song Page</h1>
            <button onClick={handleClick}>Add Song</button>
            {clicked ? <SongCreate /> : null}
            <SongList />
        </>
    );
};

export default SongPage;