import React from 'react';
import { Link } from 'react-router-dom';

import SongList from '../components/SongList';

const HomePage: React.FC = () => {
    return (
        <div>
            <h1>Song Page</h1>
            <Link to="/song/new">Add a Song</Link>
            <SongList />
        </div>
    );
};

export default HomePage;