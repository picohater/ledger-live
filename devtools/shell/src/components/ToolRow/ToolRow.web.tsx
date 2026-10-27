import {
  ListItem,
  ListItemContent,
  ListItemDescription,
  ListItemLeading,
  ListItemTitle,
  ListItemTrailing,
  Tag,
} from "@ledgerhq/lumen-ui-react";
import type { ToolKind } from "@devtools/registry";
import type { MouseEventHandler, ReactNode } from "react";
import { KindTag } from "../KindTag/KindTag";

type ToolRowProps = Readonly<{
  title: string;
  description?: string;
  owner?: string;
  kind?: ToolKind;
  trailing?: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  isActive?: boolean;
  // Currently unused by ToolRowItem (the only consumer). Kept because the
  // underlying ListItem supports a disabled state and future callers may need it.
  disabled?: boolean;
}>;

export function ToolRow({
  title,
  description,
  owner,
  kind,
  trailing,
  onClick,
  isActive,
  disabled,
}: ToolRowProps) {
  return (
    <div className="relative">
      <ListItem
        density="compact"
        onClick={disabled ? undefined : onClick}
        aria-current={isActive ? "page" : undefined}
        aria-disabled={disabled}
        className={`h-auto min-h-40 py-8 rounded-md ${isActive ? "bg-active/10" : ""} ${disabled ? "opacity-50 pointer-events-none" : ""}`}
      >
        {isActive && (
          <ListItemLeading className="absolute left-2 top-2 bottom-2" aria-hidden="true">
            <div className="w-[2px] rounded-sm bg-active h-1/2" />
          </ListItemLeading>
        )}
        <ListItemContent>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <ListItemTitle className="max-w-full shrink-0">{title}</ListItemTitle>
            {(kind || owner) && (
              <div className="ml-auto flex items-center gap-4">
                {kind && <KindTag kind={kind} />}
                {owner && <Tag label={owner} appearance="gray" size="sm" />}
              </div>
            )}
          </div>
          {description && <ListItemDescription>{description}</ListItemDescription>}
        </ListItemContent>
        {trailing && <ListItemTrailing>{trailing}</ListItemTrailing>}
      </ListItem>
    </div>
  );
}
