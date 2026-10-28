import type { LiveAppManifest } from "@ledgerhq/live-common/platform/types";

// Local manifests come first, like useLiveAppManifest on the screen the deeplink opens.
export function findDeeplinkManifest(
  appId: string,
  {
    localManifests,
    remoteManifests,
  }: { localManifests: LiveAppManifest[]; remoteManifests: LiveAppManifest[] },
): LiveAppManifest | undefined {
  const isRequestedApp = (manifest: LiveAppManifest) =>
    manifest.id.toLowerCase() === appId.toLowerCase();

  return localManifests.find(isRequestedApp) ?? remoteManifests.find(isRequestedApp);
}
