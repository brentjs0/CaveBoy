import { ColorComponentScalerNames } from './ColorComponentScaler';

export default class CaveBoyConfiguration {
    /**
     * The name of the ColorComponentScaler to use when representing 16-bit Super Famicom colors as 24-bit web colors.
     */
    public colorComponentScalerName: ColorComponentScalerNames;

    /**
     * Instantiate a CaveBoyConfiguration object.
     */
    constructor() {
        this.colorComponentScalerName = ColorComponentScalerNames.KindredGammaRamp;
    }
}