import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;
const configDB = {
    connectionString: process.env.DATABASE_URL,
};

if (process.env.NODE_ENV === "production") {
    configDB.ssl = true;
}
export const clientDB = new Pool(configDB);