import React from 'react';
import { Link } from 'react-router-dom';

import SongCreate from '../components/SongCreate';

const SongPage: React.FC = () => {
    return (
        <>
            <h1>Add a Song</h1>
            <Link to="/">Back</Link>
            <SongCreate />
        </>
    );
};

export default SongPage;