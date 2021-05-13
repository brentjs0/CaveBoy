import { ColorComponentScalerName } from '@/script/base/ColorComponentScaler';

export class CaveBoyConfiguration {
  /**
   * The name of the ColorComponentScaler to use when representing 16-bit Super Famicom colors as 24-bit web colors.
   */
  public colorComponentScalerName: ColorComponentScalerName;

  /**
   * Instantiate a CaveBoyConfiguration object.
   */
  constructor() {
    this.colorComponentScalerName = 'kindredGammaRamp';
  }
}

/**
 * Retrieve the current CaveBoyConfiguration if one exists.
 * @returns The current CaveBoyConfiguration, if one exists. Otherwise, the default configuration.
 */
export function getCurrentCaveBoyConfiguration(): CaveBoyConfiguration {
  if (window) {
    const caveBoyConfiguration = (window as any).caveBoyConfiguration;

    if (caveBoyConfiguration instanceof CaveBoyConfiguration) {
      return caveBoyConfiguration;
    }
  }

  return new CaveBoyConfiguration();
}
