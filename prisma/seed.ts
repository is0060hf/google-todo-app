import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

// .envファイルを読み込む
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  try {
    // 環境変数が正しく読み込まれているか確認
    console.log('DATABASE_URL環境変数:', process.env.DATABASE_URL ? 'セットされています' : 'セットされていません');

    // 優先度の初期データを登録
    console.log('Deleting existing priorities...');
    await prisma.$executeRaw`TRUNCATE TABLE "Priority" RESTART IDENTITY CASCADE`;
    
    console.log('Creating priorities...');
    await prisma.$executeRaw`INSERT INTO "Priority" (name, level) VALUES ('High', 3)`;
    await prisma.$executeRaw`INSERT INTO "Priority" (name, level) VALUES ('Medium', 2)`;
    await prisma.$executeRaw`INSERT INTO "Priority" (name, level) VALUES ('Low', 1)`;

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 