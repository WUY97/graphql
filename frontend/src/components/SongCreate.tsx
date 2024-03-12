import React, { FormEvent, useEffect } from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import * as g from '../GraphQL';


const SongCreate: React.FC = () => {
    const [title, setTitle] = useState('')
    const navigate = useNavigate();

    const [addSong, { data, loading, error }] = useMutation(g.ADD_SONG_MUTATION, {
        refetchQueries: [{ query: g.GET_SONGS_TITLES }],
        awaitRefetchQueries: true
    });

    useEffect(() => {
        if (data && data.addSong) {
            navigate('/');
        }
    }, [data, navigate]);

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await addSong({
                variables: {
                    title: title,
                },
            });
            console.log('Song created:', data.addSong);
            setTitle('');
        } catch (error) {
            console.error('Error creating song:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h3>Create a New Song</h3>
            <form onSubmit={handleFormSubmit}>
                <label>Song Title:</label>
                <input
                    required
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button type="submit" disabled={loading}>Create</button>
            </form>
        </div>
    );
};

export default SongCreate;