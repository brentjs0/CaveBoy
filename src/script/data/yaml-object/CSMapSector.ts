import {
  CSMapSectorSetting,
  CSMapSectorTeleport,
  CSMapSectorTownMap,
  CSMapSectorTownMapArrow,
  CSMapSectorTownMapImage,
  EnumTypeName,
  isEnumType,
} from '@/script/base/enum-types';
import { isValidNumber } from '@/script/base/primitive-types';

/**
 * An object representing an element in the map_sectors.yml file
 * of a CoilSnake project.
 */
export type CSMapSector = {
  'Item': number;
  'Music': number;
  'Palette': number;
  'Setting': CSMapSectorSetting;
  'Teleport': CSMapSectorTeleport;
  'Tileset': number;
  'Town Map': CSMapSectorTownMap;
  'Town Map Arrow': CSMapSectorTownMapImage;
  'Town Map Image': CSMapSectorTownMapArrow;
  'Town Map X': number;
  'Town Map Y': number;
};

/**
 * Check if the provided value conforms to all of the required
 * constraints to be considered a CSMapSector and return a
 * generator of string messages describing any failed requirements.
 * @param value - A value that might be a CSMapSector.
 * @returns A generator of string messages describing any reasons
 * why the provided value cannot be a CSMapSector.
 */
export function* validateCSMapSector(value: any): Generator<string> {
  if (value === null || typeof value !== 'object') {
    yield 'CSMapSector must be an object.';
    return;
  }

  if (!isValidNumber(value.Item, 0, 253)) {
    yield "'Item' must be an integer from 0 to 253.";
  }

  if (!isValidNumber(value.Music, 0)) {
    yield "'Music' must be a non-negative integer.";
  }

  if (!isValidNumber(value.Palette, 0, 7)) {
    yield "'Palette' must be an integer from 0 to 7.";
  }

  if (!isValidNumber(value.Tileset, 0, 31)) {
    yield "'Tileset' must be an integer from 0 to 31.";
  }

  if (!isValidNumber(value['Town Map X'], 0, 255)) {
    yield "'Town Map X' must be an integer from 0 to 255.";
  }

  if (!isValidNumber(value['Town Map Y'], 0, 223)) {
    yield "'Town Map Y' must be an integer from 0 to 223.";
  }

  const enumFields: [string, EnumTypeName][] = [
    ['Setting', 'CSMapSectorSetting'],
    ['Teleport', 'CSMapSectorTeleport'],
    ['Town Map', 'CSMapSectorTownMap'],
    ['Town Map Image', 'CSMapSectorTownMapImage'],
    ['Town Map Arrow', 'CSMapSectorTownMapArrow'],
  ];

  for (let [enumFieldName, enumTypeName] of enumFields) {
    if (!isEnumType(value[enumFieldName], enumTypeName)) {
      yield `'${enumFieldName}' value '${value[enumFieldName]}' is not defined.`;
    }
  }
}
