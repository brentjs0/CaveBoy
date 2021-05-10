import { segmentString } from '@/script/base/helpers';
import Color from '@/script/data/game-object/Color';
import {
  CoilSnakeMinitilePaletteString,
  isCoilSnakeMinitilePaletteString,
} from '@/script/data/coilsnake-literal/CoilSnakeMinitilePaletteString';
import CaveBoyError from '@/script/base/error/CaveBoyError';

export default class MinitilePalette {
  colors: Color[];

  constructor(
    coilSnakeMinitilePaletteString:
      | CoilSnakeMinitilePaletteString
      | undefined = undefined
  ) {
    this.colors = [];
    if (isCoilSnakeMinitilePaletteString(coilSnakeMinitilePaletteString)) {
      for (let coilSnakeColorString of segmentString(
        coilSnakeMinitilePaletteString,
        3
      )) {
        this.colors.push(new Color(coilSnakeColorString));
      }
    } else if (coilSnakeMinitilePaletteString === undefined) {
      for (let i = 0; i < 16; ++i) {
        this.colors.push(new Color());
      }
    } else {
      throw new CaveBoyError(
        `An invalid combination of arguments was provided to the MinitilePalette constructor: ${arguments}.`
      );
    }
  }
}
