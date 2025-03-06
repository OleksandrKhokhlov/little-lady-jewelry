export const mapLockType = {
  1: "Всі",
  2: "Конго",
  3: "Англійский замок",
  4: "Пусети на закрутках",
  5: "Пусети на заглушках",
};

export const lockTypes = Object.entries(mapLockType).map(([value, name]) => ({
  name,
  value,
}));

export type LockTypes = keyof typeof mapLockType;
