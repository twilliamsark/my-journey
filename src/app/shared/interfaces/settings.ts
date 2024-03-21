export const SETTINGS_ORDER_VALUES = ['asc', 'desc'] as const;
export type SettingsOrderTypes = typeof SETTINGS_ORDER_VALUES;
export type SettingsOrderType = SettingsOrderTypes[number];

export type SettingsState = {
  // searchDate: { from: string; to: string } | null;
  query: string;
  order: SettingsOrderType;
};
