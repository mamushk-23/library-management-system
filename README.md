# Library Management System

Welcome to the data layer for the Library Management System!

## Setup Instructions
1. Copy `.env.example` to `.env` and update your `DATABASE_URL`.
2. Run `npx prisma migrate dev --name init` to apply the schema to your PostgreSQL database.
3. Run `npx prisma db seed` to populate the database with initial genres and books.

## Schema Decisions

### Why Book references Genre rather than embedding it
In this schema, the `Book` model references the `Genre` model using a foreign key (`genreId`) and a `@relation`, rather than embedding the genre name directly as a string or an embedded document. 

**Reasoning:**
1. **Data Normalization & Consistency:** By using a separate `Genre` table, we ensure that genre names are standardized. If we decide to rename "Science Fiction" to "Sci-Fi", we only update it in one place (the `Genre` table) rather than updating every single book record.
2. **Querying & Indexing:** Relational lookups are highly optimized in PostgreSQL. If we want to find all books in a specific genre, or count books per genre, a foreign key relationship with an index is much more efficient than parsing strings or querying embedded arrays.
3. **Extensibility:** A separate `Genre` model allows us to easily add more metadata to genres in the future (e.g., `description`, `iconUrl`) without bloating the `Book` records.

## Prisma vs. Document Database (Stretch Note)
Modeling in Prisma (which maps to a relational database like PostgreSQL) felt quite different from modeling in a document database like MongoDB. In a document database, I would likely have embedded the `genre` directly inside the `book` document (e.g., `genre: { name: "Fiction" }`) to optimize for read performance and avoid joins. However, Prisma's strongly-typed schema and relational approach forced me to think about data integrity, normalization, and explicit foreign key relationships upfront. While it requires writing slightly more complex queries (using `include` to fetch relations), the trade-off is much stricter data consistency and easier maintenance as the catalog grows.