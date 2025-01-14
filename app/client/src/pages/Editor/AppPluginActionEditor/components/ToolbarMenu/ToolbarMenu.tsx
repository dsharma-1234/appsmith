import React from "react";
import { MenuSeparator } from "@appsmith/ads";
import {
  getHasDeleteActionPermission,
  getHasManageActionPermission,
} from "ee/utils/BusinessFeatures/permissionPageHelpers";
import { useFeatureFlag } from "utils/hooks/useFeatureFlag";
import { FEATURE_FLAG } from "ee/entities/FeatureFlag";
import {
  usePluginActionContext,
  DocsMenuItem as Docs,
} from "PluginActionEditor";
import { ConvertToModuleCTA } from "../ConvertToModule";
import { Move } from "./Move";
import { Copy } from "./Copy";
import { Delete } from "./Delete";
import { RenameMenuItem } from "IDE";

export const ToolbarMenu = () => {
  const { action } = usePluginActionContext();

  const isFeatureEnabled = useFeatureFlag(FEATURE_FLAG.license_gac_enabled);
  const isChangePermitted = getHasManageActionPermission(
    isFeatureEnabled,
    action.userPermissions,
  );
  const isDeletePermitted = getHasDeleteActionPermission(
    isFeatureEnabled,
    action.userPermissions,
  );

  return (
    <>
      <RenameMenuItem disabled={!isChangePermitted} entityId={action.id} />
      <ConvertToModuleCTA />
      <Copy disabled={!isChangePermitted} />
      <Move disabled={!isChangePermitted} />
      <Docs />
      <MenuSeparator />
      <Delete disabled={!isDeletePermitted} />
    </>
  );
};
