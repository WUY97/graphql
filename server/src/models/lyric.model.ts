import mongoose, { Schema, Document } from 'mongoose';

export interface ILyric extends Document {
    text: string;
    timestamp: number;
    songId: string;
}

const LyricSchema: Schema = new Schema({
    text: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Number,
    },
    songId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',
    },
});

export default mongoose.model<ILyric>('Lyric', LyricSchema);
