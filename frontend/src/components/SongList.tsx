import { useQuery } from '@apollo/client';
import { Fragment } from 'react';
import * as g from '../GraphQL';

type Song = {
    title: string;
    lyrics: Lyric[];
};

type Lyric = {
    content: string;
};

function SongList() {
    const { loading, error, data } = useQuery(g.GET_SONGS_TITLES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>
        Error: {error.message}
    </p>;

    return (
        <div>
            <h1>Song List</h1>
            <ul>
                {data.songs.map((song: Song, songIndex: number) => (
                    <Fragment key={songIndex}>
                        <li>{song.title}</li>
                        <ul>
                            {song.lyrics.map((lyric: Lyric, lyricIndex: number) => (
                                <li key={lyricIndex}>{lyric.content}</li>
                            ))}
                        </ul>
                    </Fragment>
                ))}
            </ul>
        </div>
    );
}

export default SongList;