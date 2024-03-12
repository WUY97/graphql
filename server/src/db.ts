import mongoose from 'mongoose';
import { UserModel, CompanyModel, SongModel, LyricModel } from './models';
import * as S from './assets/seeds';
import path from 'path';
import { parseLRC } from './utils/lyrics';

const MONGO_URI = process.env.MONGO_URI;

const updateSeeds = async () => {
    await UserModel.bulkWrite(
        S.USER_SEEDS.map((user) => ({
            updateOne: {
                filter: { id: user.id },
                update: { $set: user },
                upsert: true,
            },
        }))
    );
    console.log('User seeds added...');

    await CompanyModel.bulkWrite(
        S.COMPANY_SEEDS.map((company) => ({
            updateOne: {
                filter: { id: company.id },
                update: { $set: company },
                upsert: true,
            },
        }))
    );
    console.log('Company seeds added...');

    await SongModel.deleteMany({});
    await LyricModel.deleteMany({});

    for (const songData of S.SONG_SEEDS) {
        const user = await UserModel.findOne({ id: songData.user });
        if (!user) {
            throw new Error(`User with id ${songData.user} not found`);
        }

        const song = await SongModel.create({
            title: songData.title,
            user: user._id,
        });

        const lyrics = await parseLRC(
            path.join(__dirname, `./assets/${songData.lyricFileName}`)
        );

        for (const lyricData of lyrics) {
            await SongModel.addLyric(song._id, lyricData.content);
        }
    }
    console.log('Song and lyrics seeds added...');
};

const connectDB = async () => {
    try {
        console.log('MongoDB Connecting...');
        await mongoose.connect(MONGO_URI as string);
        console.log('MongoDB Connected...');

        updateSeeds();
    } catch (err: any) {
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDB;
