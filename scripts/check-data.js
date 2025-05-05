require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('DATABASE_URL環境変数:', process.env.DATABASE_URL ? 'セットされています' : 'セットされていません');
    
    const priorities = await prisma.$queryRaw`SELECT * FROM "Priority"`;
    console.log('Priorities:', priorities);
    
    return priorities;
  } catch (error) {
    console.error('Error querying data:', error);
    throw error;
  }
}

main()
  .then(data => {
    console.log('データ取得成功!');
  })
  .catch(error => {
    console.error('エラーが発生しました:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
