import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    firstName: string;
    id: string;
    age: number;
    companyId: mongoose.Schema.Types.ObjectId;
}

const UserSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    companyId: {
        type: String,
        ref: 'Company',
    },
});

export default mongoose.model('User', UserSchema);
