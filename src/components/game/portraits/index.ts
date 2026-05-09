import type { ComponentType } from "react";
import { FriendMajorCompanyPortrait } from "./FriendMajorCompanyPortrait";

export const PORTRAIT_REGISTRY: Record<string, ComponentType> = {
  "friend-major-company": FriendMajorCompanyPortrait,
};
