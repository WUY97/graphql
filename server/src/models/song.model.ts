import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import { ILyric } from './lyric.model';

export interface ISong extends Document {
    title: string;
    user: Types.ObjectId;
    lyrics: Types.ObjectId[];
}

interface ISongModel extends Model<ISong> {
    addLyric(id: string, content: string): Promise<ISong>;
    findLyrics(id: string): Promise<ILyric[]>;
}

const SongSchema: Schema = new Schema({
    title: { type: String },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    lyrics: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Lyric',
        },
    ],
});

SongSchema.statics.addLyric = function (id: string, content: string) {
    const Lyric = mongoose.model('Lyric');
    return this.findById(id).then((song: any) => {
        const lyric = new Lyric({ content, song });
        song.lyrics.push(lyric);
        return Promise.all([lyric.save(), song.save()]).then(
            ([lyric, song]: any) => song
        );
    });
};

SongSchema.statics.findLyrics = function (id: string) {
    return this.findById(id)
        .populate('lyrics')
        .then((song: any) => song.lyrics);
};

export default mongoose.model<ISong, ISongModel>('Song', SongSchema);
