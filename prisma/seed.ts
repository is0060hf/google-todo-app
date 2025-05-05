import { PrismaClient } from '@prisma/client';

// 明示的に型を指定
interface PrismaClientWithExtensions extends PrismaClient {
  priority: {
    deleteMany: (params: any) => Promise<any>;
    create: (params: any) => Promise<any>;
  }
}

const prisma = new PrismaClient() as PrismaClientWithExtensions;

async function main() {
  console.log('Seeding database...');

  try {
    // 優先度の初期データを登録
    await prisma.priority.deleteMany({});
    
    await prisma.priority.create({
      data: {
        name: 'High',
        level: 3,
      },
    });

    await prisma.priority.create({
      data: {
        name: 'Medium',
        level: 2,
      },
    });

    await prisma.priority.create({
      data: {
        name: 'Low',
        level: 1,
      },
    });

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