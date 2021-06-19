/**
 * A list of possible values for the Setting field of a CSMapSector object.
 */
export enum CSMapSectorSetting {
  None = 'none',
  Indoors = 'indoors',
  ExitMouseUsable = 'exit mouse usable',
  LostUnderworldSprites = 'lost underworld sprites',
  MagicantSprites = 'magicant sprites',
  RobotSprites = 'robot sprites',
  Butterflies = 'butterflies',
  IndoorsAndButterflies = 'indoors and butterflies',
}

/**
 * A list of possible values for the Teleport field of a CSMapSector object.
 */
export enum CSMapSectorTeleport {
  Enabled = 'enabled',
  Disabled = 'disabled',
}

/**
 * A list of possible values for the Town Map field of a CSMapSector object.
 */
export enum CSMapSectorTownMap {
  None = 'none',
  Onett = 'onett',
  Twoson = 'twoson',
  Threed = 'threed',
  Fourside = 'fourside',
  Scaraba = 'scaraba',
  Summers = 'summers',
  None2 = 'none 2',
}

/**
 * A list of possible values for the Town Map Image field of a CSMapSector
 * object.
 */
export enum CSMapSectorTownMapImage {
  None = 'none',
  Onett = 'onett',
  Twoson = 'twoson',
  Threed = 'threed',
  Fourside = 'fourside',
  Scaraba = 'scaraba',
  Summers = 'summers',
}

/**
 * A list of possible values for the Town Map Arrow field of a CSMapSector
 * object.
 */
export enum CSMapSectorTownMapArrow {
  None = 'none',
  Up = 'up',
  Down = 'down',
  Right = 'right',
  Left = 'left',
}

const enumTypes = {
  CSMapSectorSetting: CSMapSectorSetting,
  CSMapSectorTeleport: CSMapSectorTeleport,
  CSMapSectorTownMap: CSMapSectorTownMap,
  CSMapSectorTownMapImage: CSMapSectorTownMapImage,
  CSMapSectorTownMapArrow: CSMapSectorTownMapArrow,
} as const;

export type EnumTypeName = keyof typeof enumTypes;

/**
 * A CaveBoy-defined enum type with the name T.
 */
// prettier-ignore
export type EnumType<T extends EnumTypeName> =
    T extends 'CSMapSectorSetting' ? CSMapSectorSetting
  : T extends 'CSMapSectorTeleport' ? CSMapSectorTeleport
  : T extends 'CSMapSectorTownMap' ? CSMapSectorTownMap
  : T extends 'CSMapSectorTownMapImage' ? CSMapSectorTownMapImage
  : T extends 'CSMapSectorTownMapArrow' ? CSMapSectorTownMapArrow
  : never;

/**
 * Return true if the provided value meets the constraints to be considered the
 * specified enum type.
 * @param value - A value that might be of the specified type.
 * @param type - The name of the enum type for which to check the provided value.
 * @returns True if the provided value meets the constraints to be considered
 * the specified enum type. Otherwise, false.
 */
export function isEnumType<T extends EnumTypeName>(
  value: any,
  type: T
): value is EnumType<T> {
  return (
    typeof value === 'string' &&
    Object.entries(enumTypes[type]).some((entry) => entry[1] === value)
  );
}
