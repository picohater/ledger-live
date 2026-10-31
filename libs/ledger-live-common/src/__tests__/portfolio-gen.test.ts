/**
 * Scratch generator for a USD-targeted demo portfolio.
 * Run: PROFILE_SRC=... PROFILE_OUT=... npx jest src/__tests__/portfolio-gen.test.ts
 * Balances are re-scaled afterwards by ledger-demo-profiles/scale-portfolio.py.
 */
import "./test-helpers/environment";
import { readFileSync, writeFileSync } from "fs";
import { getCryptoCurrencyById } from "@domain/entity-currency-crypto";
import { genMockAccount } from "../mock/account";
import { toAccountRaw } from "../account/serialization";

// monero has no coin module here, so it is added by scale-portfolio.py instead
const CURRENCIES = ["bitcoin", "ethereum", "solana", "litecoin", "ripple", "zcash"];

// Needs the profile paths, so it stays inert during a plain `pnpm test`.
const maybe = process.env.PROFILE_SRC ? test : test.skip;

maybe(
  "generate a multi-currency portfolio profile",
  async () => {
    const wallet = JSON.parse(readFileSync(process.env.PROFILE_SRC!, "utf8"));
    const accounts: unknown[] = [];

    for (const id of CURRENCIES) {
      const currency = getCryptoCurrencyById(id);
      const account = await genMockAccount(`portfolio-${id}`, { currency, operationsSize: 24 });
      const raw = await toAccountRaw(account);
      accounts.push({ data: { ...raw, name: currency.name }, version: 3 });
    }

    wallet.data.accounts = accounts;
    writeFileSync(process.env.PROFILE_OUT!, JSON.stringify(wallet));
    // eslint-disable-next-line no-console
    console.log(`wrote ${accounts.length} accounts to ${process.env.PROFILE_OUT}`);
  },
  120000,
);
