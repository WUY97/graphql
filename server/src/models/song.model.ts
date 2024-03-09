import mongoose, { Schema, Document } from 'mongoose';

export interface ISong extends Document {
    // id: string;
    title: string;
    artist: string;
    album: string;
    releasedDate: Date;
    lyricsIds: string[];
    durationInSeconds: number;
}

const SongSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    album: {
        type: String,
    },
    releasedDate: {
        type: Date,
    },
    lyricsIds: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Lyric',
            },
        ],
    },
    durationInSeconds: {
        type: Number,
    },
});

export default mongoose.model<ISong>('Song', SongSchema);
