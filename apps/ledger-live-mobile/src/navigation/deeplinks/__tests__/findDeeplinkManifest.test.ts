import type { LiveAppManifest } from "@ledgerhq/live-common/platform/types";
import { findDeeplinkManifest } from "../findDeeplinkManifest";

const createManifest = (id: string, url: string) => ({ id, url }) as LiveAppManifest;

describe("findDeeplinkManifest", () => {
  const remotePredictions = createManifest("predictions-live-app", "https://remote.example");
  const localPredictions = createManifest("predictions-live-app", "http://localhost:3000");

  it("finds a remote manifest", () => {
    expect(
      findDeeplinkManifest("predictions-live-app", {
        localManifests: [],
        remoteManifests: [remotePredictions],
      }),
    ).toBe(remotePredictions);
  });

  it("finds a manifest that only exists locally", () => {
    expect(
      findDeeplinkManifest("predictions-live-app", {
        localManifests: [localPredictions],
        remoteManifests: [createManifest("swap-live-app", "https://swap.example")],
      }),
    ).toBe(localPredictions);
  });

  it("prefers the local manifest over the remote one", () => {
    expect(
      findDeeplinkManifest("predictions-live-app", {
        localManifests: [localPredictions],
        remoteManifests: [remotePredictions],
      }),
    ).toBe(localPredictions);
  });

  it("ignores the case of the app id", () => {
    expect(
      findDeeplinkManifest("Predictions-Live-App", {
        localManifests: [],
        remoteManifests: [remotePredictions],
      }),
    ).toBe(remotePredictions);
  });

  it("returns undefined when no manifest matches", () => {
    expect(
      findDeeplinkManifest("predictions-live-app", {
        localManifests: [],
        remoteManifests: [createManifest("swap-live-app", "https://swap.example")],
      }),
    ).toBeUndefined();
  });
});
