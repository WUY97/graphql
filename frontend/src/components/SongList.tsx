import { gql, useQuery } from '@apollo/client';
import { Fragment } from 'react';

const GET_SONGS_TITLES = gql`
    query {
        songs {
            title
            lyrics {
                text
                timestamp
            }
        }
    }
`;

function SongList() {
    const { loading, error, data } = useQuery(GET_SONGS_TITLES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>
        Error: {error.message}
    </p>;

    return (
        <div>
            <h1>Song List</h1>
            <ul>
                {data.songs.map((song: any, songIndex: number) => (
                    <Fragment key={songIndex}>
                        <li>{song.title}</li>
                        <ul>
                            {song.lyrics.map((lyric: any, lyricIndex: number) => (
                                <li key={lyricIndex}>{lyric.text}</li>
                            ))}
                        </ul>
                    </Fragment>
                ))}
            </ul>
        </div>
    );
}

export default SongList;