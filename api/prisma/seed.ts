// seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱  Seeding database...');

  // 1. Create 4 Genres
  const fiction = await prisma.genre.upsert({
    where: { name: 'Fiction' },
    update: {},
    create: { name: 'Fiction' },
  });
  const sciFi = await prisma.genre.upsert({
    where: { name: 'Science Fiction' },
    update: {},
    create: { name: 'Science Fiction' },
  });
  const mystery = await prisma.genre.upsert({
    where: { name: 'Mystery' },
    update: {},
    create: { name: 'Mystery' },
  });
  const nonFiction = await prisma.genre.upsert({
    where: { name: 'Non-Fiction' },
    update: {},
    create: { name: 'Non-Fiction' },
  });

  // 2. Create 16 Books distributed across the 4 genres
  await prisma.book.createMany({
    data: [
      // Fiction (4 books)
      { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', genreId: fiction.id },
      { title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '9780061120084', genreId: fiction.id },
      { title: '1984', author: 'George Orwell', isbn: '9780451524935', genreId: fiction.id },
      { title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '9780141439518', genreId: fiction.id },
      
      // Science Fiction (4 books)
      { title: 'Dune', author: 'Frank Herbert', isbn: '9780441172719', genreId: sciFi.id },
      { title: 'Neuromancer', author: 'William Gibson', isbn: '9780441569595', genreId: sciFi.id },
      { title: 'The Left Hand of Darkness', author: 'Ursula K. Le Guin', isbn: '9780441478125', genreId: sciFi.id },
      { title: 'Foundation', author: 'Isaac Asimov', isbn: '9780553293357', genreId: sciFi.id },
      
      // Mystery (4 books)
      { title: 'The Hound of the Baskervilles', author: 'Arthur Conan Doyle', isbn: '9780141329390', genreId: mystery.id },
      { title: 'Murder on the Orient Express', author: 'Agatha Christie', isbn: '9780062693662', genreId: mystery.id },
      { title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson', isbn: '9780307454546', genreId: mystery.id },
      { title: 'Gone Girl', author: 'Gillian Flynn', isbn: '9780399590504', genreId: mystery.id },
      
      // Non-Fiction (4 books)
      { title: 'Sapiens', author: 'Yuval Noah Harari', isbn: '9780062316097', genreId: nonFiction.id },
      { title: 'Educated', author: 'Tara Westover', isbn: '9780399590504', genreId: nonFiction.id },
      { title: 'Becoming', author: 'Michelle Obama', isbn: '9781524763138', genreId: nonFiction.id },
      { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', isbn: '9780374533557', genreId: nonFiction.id },
    ],
  });

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });