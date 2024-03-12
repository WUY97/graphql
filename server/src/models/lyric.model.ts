import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ILyric extends Document {
    song: Types.ObjectId;
    likes: number;
    content: string;
}

interface ILyricModel extends mongoose.Model<ILyric> {
    like(id: string): Promise<ILyric>;
}

const LyricSchema: Schema = new Schema({
    song: {
        type: Schema.Types.ObjectId,
        ref: 'Song',
    },
    likes: { type: Number, default: 0 },
    content: { type: String },
});

LyricSchema.statics.like = function (id: string) {
    return this.findById(id).then((lyric: any) => {
        ++lyric.likes;
        return lyric.save();
    });
};

export default mongoose.model<ILyric, ILyricModel>('Lyric', LyricSchema);
