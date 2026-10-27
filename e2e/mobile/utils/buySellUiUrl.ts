import { log } from "detox";
import { parseExtraFeatureFlags } from "@ledgerhq/live-e2e-shared/featureFlagsJsonUtils";
import type { LiveAppManifest } from "@ledgerhq/live-common/platform/types";
import type { PartialFeatures } from "@shared/feature-flags";
import { getEnvs, getFlags, importLocalManifests } from "@e2e/bridge/server";

const DEFAULT_BUY_SELL_UI_MANIFEST_ID = "buy-sell-ui";

/**
 * Points Buy/Sell at `BUY_SELL_UI_URL` (a buy-sell-ui PR preview, localhost, ...): the catalog
 * manifest the app resolves for Buy/Sell is sent back as a local manifest loading that URL.
 */
export async function applyBuySellUiUrl(): Promise<void> {
  const url = process.env.BUY_SELL_UI_URL?.trim();
  if (!url) return;

  const flags = parseExtraFeatureFlags<PartialFeatures>(await getFlags());
  const manifestId = flags.buySellUi?.params?.manifestId || DEFAULT_BUY_SELL_UI_MANIFEST_ID;
  const { PLATFORM_MANIFEST_API_URL } = JSON.parse(await getEnvs());

  const response = await fetch(PLATFORM_MANIFEST_API_URL);
  if (!response.ok) {
    throw new Error(`BUY_SELL_UI_URL: catalog request failed with HTTP ${response.status}`);
  }
  const catalog: LiveAppManifest[] = await response.json();
  const manifest = catalog.find(({ id }) => id === manifestId);
  if (!manifest) {
    throw new Error(`BUY_SELL_UI_URL: manifest "${manifestId}" not found in the catalog`);
  }

  importLocalManifests([
    {
      ...manifest,
      url,
      homepageUrl: url,
      domains: [...manifest.domains, new URL(url).origin],
    },
  ]);
  log.info(`[E2E] Buy/Sell manifest "${manifestId}" now loads ${url}`);
}
