import mongoose from 'mongoose';
import { UserModel, CompanyModel } from './models';
const MONGO_URI = process.env.MONGO_URI;

const userSeeds = [
    {
        id: '1',
        firstName: 'Apple Banana',
        age: 25,
        companyId: '1',
    },
    {
        id: '2',
        firstName: 'Cat Dog',
        age: 24,
        companyId: '2',
    },
    {
        id: '3',
        firstName: 'Elephant Fox',
        age: 30,
        companyId: '1',
    },
];

const companySeeds = [
    {
        id: '1',
        name: 'Doodle',
        description: 'A company that makes doodles',
    },
    {
        id: '2',
        name: 'Abode',
        description: 'A company that makes abodes',
    },
];

const connectDB = async () => {
    try {
        console.log('MongoDB Connecting...');
        await mongoose.connect(MONGO_URI as string);
        console.log('MongoDB Connected...');

        for (const user of userSeeds) {
            const userExists = await UserModel.exists({ id: user.id });
            if (!userExists) {
                await UserModel.create(user);
            }
        }
        console.log('User seeds added...');

        for (const company of companySeeds) {
            const companyExists = await CompanyModel.exists({ id: company.id });
            if (!companyExists) {
                await CompanyModel.create(company);
            }
        }
        console.log('Company seeds added...');
    } catch (err: any) {
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDB;
