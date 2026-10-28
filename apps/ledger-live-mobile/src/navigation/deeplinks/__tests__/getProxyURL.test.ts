import { getProxyURL } from "../getProxyURL";

describe("getProxyURL", () => {
  describe("predictions deeplink", () => {
    it("opens the predictions live app through the discover route", () => {
      expect(getProxyURL("ledgerlive://predictions")).toBe(
        "ledgerlive://discover/predictions-live-app",
      );
    });

    it("forwards the query params to the live app", () => {
      expect(
        getProxyURL("ledgerlive://predictions?eventSlug=will-btc-hit-100k&deeplinkSource=braze"),
      ).toBe(
        "ledgerlive://discover/predictions-live-app?eventSlug=will-btc-hit-100k&deeplinkSource=braze",
      );
    });

    it("keeps the ledgerwallet scheme", () => {
      expect(getProxyURL("ledgerwallet://predictions?eventSlug=abc")).toBe(
        "ledgerwallet://discover/predictions-live-app?eventSlug=abc",
      );
    });
  });

  it("opens protect apps through the recover route", () => {
    expect(getProxyURL("ledgerlive://discover/protect-prod?theme=dark")).toBe(
      "ledgerlive://recover/protect-prod?theme=dark",
    );
  });

  it("wraps a WalletConnect URI in the wc deeplink", () => {
    expect(getProxyURL("wc:abc@2?relay-protocol=irn")).toBe(
      `ledgerlive://wc?uri=${encodeURIComponent("wc:abc@2?relay-protocol=irn")}`,
    );
  });

  it("opens the buy sell app links from desktop through the discover route", () => {
    expect(getProxyURL("ledgerlive://platform/buy-sell-ui?mode=buy")).toBe(
      "ledgerlive://discover/buy-sell-ui?mode=buy",
    );
  });

  it("opens a custom buy sell app through the discover route", () => {
    expect(getProxyURL("ledgerlive://platform/buy-sell-ui-stg", "buy-sell-ui-stg")).toBe(
      "ledgerlive://discover/buy-sell-ui-stg",
    );
  });

  it("leaves platform links to other apps unchanged", () => {
    expect(getProxyURL("ledgerlive://platform/paraswap")).toBe("ledgerlive://platform/paraswap");
  });

  it("leaves other deeplinks unchanged", () => {
    expect(getProxyURL("ledgerlive://swap?fromToken=btc")).toBe("ledgerlive://swap?fromToken=btc");
  });
});
