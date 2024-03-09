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

    for (const song of S.SONG_SEEDS) {
        const newSong = await SongModel.create({
            title: song.title,
            artist: song.artist,
            album: song.album,
            releasedDate: song.releasedDate,
            lyricsIds: [],
        });

        const lyrics = await parseLRC(
            path.join(__dirname, `./assets/${song.lyricFileName}`)
        );

        const lyricsIds = [];
        for (const lyric of lyrics) {
            const newLyric = await LyricModel.create({
                text: lyric.text,
                timestamp: lyric.timestamp,
                songId: newSong._id,
            });
            lyricsIds.push(newLyric._id);
        }
        await SongModel.updateOne(
            {
                _id: newSong._id,
            },
            {
                $set: {
                    lyricsIds: lyricsIds,
                },
            }
        );
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
