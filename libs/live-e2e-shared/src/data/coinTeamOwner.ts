import { Team } from "../enum/Team";

// A coin's e2e tests belong to the team that owns its coin module in CODEOWNERS: BST 1, 2 and 3
// map to BST, every other module to Coin-integration. A token resolves through its chain's id.
// coin-evm, coin-stellar, coin-tezos and coin-xrp are installed from LedgerHQ/coin-modules, so
// their owners come from that repo's CODEOWNERS.
const BST_CURRENCY_IDS = new Set([
  // BST 1: @ledgerhq/blockchain-support
  "aptos",
  "filecoin",
  "kaspa",
  "mina",
  "near",
  "stacks",
  "vechain",
  "zcash",
  // BST 2: @ledgerhq/ledger-partner-blockydevs
  "aleo",
  "algorand",
  "casper",
  "elrond",
  "hedera",
  "icon",
  "ripple",
  "stellar",
  // BST 3: @ledgerhq/ledger-partner-hoodies
  "canton",
  "cardano",
  "celo",
  "concordium",
  "concordium_testnet",
  "internet_computer",
  "sui",
  "tezos",
  "ton",
]);

export function coinTeamOwner(currencyId: string): Team {
  return BST_CURRENCY_IDS.has(currencyId.split("/")[0]) ? Team.BST : Team.COIN_INTEGRATION;
}
