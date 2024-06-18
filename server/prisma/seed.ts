// seed.ts
import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
 const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  await prisma.user.create({
    data: {
        studentId: "RCA00001",
        firstName: "ADMIN",
        lastName: "RCA_LMS",
        email: "admin@lms.rca.rw",
        password: hashedPassword,
        role: Role.ADMIN
    }
  })

  // Seed other models as needed
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });