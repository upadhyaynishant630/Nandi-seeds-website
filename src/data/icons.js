/* =========================================================
   Nandi Seeds - SHARED ICON MAP

   Content files (siteData.js) stay plain data and only store
   an icon "key". Components resolve that key to a real
   react-icons component through this map.
========================================================= */

import {
  FiTrendingUp,
  FiLayers,
  FiCloudRain,
  FiUsers,
  FiPackage,
  FiShield,
  FiFeather,
  FiTarget,
  FiClipboard,
  FiHeadphones,
  FiTruck,
  FiAward,
  FiCheckCircle,
} from "react-icons/fi";

/* =========================================================
   FEATURE / VALUE ICONS
========================================================= */

export const FEATURE_ICONS = {
  germination: FiTrendingUp,
  dna: FiLayers,
  climate: FiCloudRain,
  support: FiUsers,
  packaging: FiPackage,
  honest: FiShield,
  award: FiAward,
  quality: FiCheckCircle,
};

/* =========================================================
   SERVICE ICONS
========================================================= */

export const SERVICE_ICONS = {
  seed: FiFeather,
  trial: FiTarget,
  lab: FiClipboard,
  shield: FiShield,
  support: FiHeadphones,
  network: FiTruck,
};

/* =========================================================
   RESOLVER
   Looks in both maps and falls back to a neutral icon so a
   typo in the data never crashes a page.
========================================================= */

export function resolveIcon(key) {
  return FEATURE_ICONS[key] || SERVICE_ICONS[key] || FiCheckCircle;
}
