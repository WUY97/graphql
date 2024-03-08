import mongoose, { Schema, Document } from 'mongoose';

export interface ICompany extends Document {
    name: string;
    description: string;
}

const CompanySchema: Schema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

export default mongoose.model<ICompany>('Company', CompanySchema);
