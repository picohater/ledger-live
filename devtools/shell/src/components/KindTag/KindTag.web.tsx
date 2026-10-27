import { Tag, type TagProps } from "@ledgerhq/lumen-ui-react";
import { ToolKind } from "@devtools/registry";

const appearanceByKind: Record<ToolKind, TagProps["appearance"]> = {
  entity: "accent-subtle",
  api: "success",
  feature: "accent",
  shared: "warning",
  lib: "base",
};

export function KindTag({ kind }: Readonly<{ kind: ToolKind }>) {
  return <Tag label={kind} appearance={appearanceByKind[kind]} size="sm" className="shrink-0" />;
}
