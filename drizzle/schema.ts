import {
  integer,
  text,
  timestamp,
  pgTable,
  uuid,
  primaryKey,
  pgEnum,
  unique,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";

export const roleEnum = pgEnum("role", ["USER", "ADMIN"]);

export const users = pgTable("user", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  name: text("name"),
  first_name: text("first_name"),
  last_name: text("last_name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  tokenUsedForVerification: text("tokenUsedForVerification").unique(),
  image: text("image"),
  password: text("password"),
  role: roleEnum("role").default("USER"),
});

export const accounts = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const verificationTokens = pgTable(
  "verificationToken",
  {
    id: uuid("id").defaultRandom().notNull().primaryKey(),
    email: text("email"),
    token: text("token").unique(),
    expires: timestamp("expires")
  }, (table) => ({
    unq: unique().on(table.email, table.token)
  })
)

export const passwordResetTokens = pgTable(
  "passwordResetToken", {
    id: uuid("id").defaultRandom().notNull().primaryKey(),
    email: text("email").notNull(),
    token: text("token").notNull().unique(),
    expires: timestamp("expires").notNull(),
  }, (table) => ({
    unq: unique().on(table.email, table.token)
  })
)