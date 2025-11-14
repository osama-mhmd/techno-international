import { drizzle } from "drizzle-orm/node-postgres";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const db = drizzle(process.env.DATABASE_URL!);

export default db;

export { users, pages } from "./schema";
