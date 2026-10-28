import { BUY_SELL_UI_APP_ID } from "@ledgerhq/live-common/wallet-api/constants";
import { PREDICTIONS_LIVE_APP_ID } from "@features/platform-predictions";

export function isWalletConnectUrl(url: string) {
  return url.startsWith("wc:");
}

export function getProxyURL(url: string, customBuySellUiAppId?: string) {
  const uri = new URL(url);
  const { hostname, pathname } = uri;
  const platform = pathname.split("/")[1];

  if (hostname === "discover" && platform && platform.startsWith("protect")) {
    return url.replace("://discover", "://recover");
  }

  if (isWalletConnectUrl(url)) {
    return `ledgerlive://wc?uri=${encodeURIComponent(url)}`;
  }

  // Goes through the discover route so the link gets its manifest and onboarding checks.
  if (hostname === "predictions") {
    return `${uri.protocol}//discover/${PREDICTIONS_LIVE_APP_ID}${uri.search}`;
  }

  const buySellAppIds = customBuySellUiAppId
    ? [customBuySellUiAppId, BUY_SELL_UI_APP_ID]
    : [BUY_SELL_UI_APP_ID];

  // This is to handle links set in the useFromAmountStatusMessage in LLC.
  // Also handles a difference in paths between LLD on LLD /platform/:app_id
  // but on LLM /discover/:app_id
  if (hostname === "platform" && buySellAppIds.includes(platform)) {
    return url.replace("://platform", "://discover");
  }

  return url;
}
