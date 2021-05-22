import CaveBoyImageData from '@/script/base/CaveBoyImageData';
import { CoilSnakeArrangementCellString } from '@/script/base/primitive-types';

export default class ArrangementCell {
  public minitileNumber: number;
  public minitilePaletteNumber: number;

  public flippedHorizontally: boolean;
  public flippedVertically: boolean;
  public coversLowerBody: boolean;
  public coversUpperBody: boolean;
  public inflictsSunstroke: boolean;
  public isWater: boolean;
  public isInteractive: boolean;
  public flag0x20: boolean;
  public flag0x40: boolean;
  public isSolid: boolean;

  public get isDeepWater(): boolean {
    return this.inflictsSunstroke && this.isWater;
  }

  public get extendsInteractionRange() {
    return this.coversUpperBody && this.isSolid;
  }

  public constructor(
    coilSnakeArrangementCellString?: CoilSnakeArrangementCellString
  ) {
    this.minitileNumber = 0;
    this.minitilePaletteNumber = 0;
    this.flippedHorizontally = false;
    this.flippedVertically = false;
    this.coversLowerBody = false;
    this.coversUpperBody = false;
    this.inflictsSunstroke = false;
    this.isWater = false;
    this.isInteractive = false;
    this.flag0x20 = false;
    this.flag0x40 = false;
    this.isSolid = false;
  }

  public getImageData(/*graphicSet: GraphicSet*/): CaveBoyImageData {
    return new CaveBoyImageData(1, 1);
  }

  public toCoilSnakeArrangementCellString(): CoilSnakeArrangementCellString {
    return '';
  }
}
