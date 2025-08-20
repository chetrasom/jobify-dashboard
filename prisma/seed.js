// const { PrismaClient } = require("@prisma/client");
const { PrismaClient } = require('../src/generated/prisma/client');
const data = require('./mock-data.json');
const prisma = new PrismaClient();

async function main() {
    const clerkId = 'user_31PYvXwh2Geengg3dxXeevaYLai';

    const jobs = data.map((job) => ({
        ...job,
        clerkId,
    }));

    await prisma.job.createMany({
        data: jobs,
        skipDuplicates: true, // optional: skips if same unique field already exists
    });

    console.log('✅ Mock jobs inserted successfully!');
}

main()
    .catch(async (e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });