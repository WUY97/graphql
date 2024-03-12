import { gql } from '@apollo/client';

export const ADD_SONG_MUTATION = gql`
    mutation AddSong($title: String!) {
        addSong(title: $title) {
            id
            title
        }
    }
`;

export const GET_SONGS_TITLES = gql`
    query {
        songs {
            title
            lyrics {
                content
            }
        }
    }
`;
