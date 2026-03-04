export const mapLockType = {
  1: "Всі",
  2: "Конго",
  3: "Англійський замок",
  4: "Пусети на закрутках",
  5: "Пусети на заглушках",
} as const;

export const lockTypes = Object.entries(mapLockType).map(([value, name]) => ({
  name,
  value,
}));

export type LockTypes = keyof typeof mapLockType;
export type LockTypeValues = typeof mapLockType[keyof typeof mapLockType];