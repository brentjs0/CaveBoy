/**
 * An error specific to CaveBoy.
 */
export default class CaveBoyError extends Error {
    /**
     * Instantiate a CaveBoy-specific error.
     * @param message - A human-readable description of the error.
     */
    constructor(message: string) {
        super(message);

        // Set the prototype for environments where super() returns an object other than 'this'.
        Object.setPrototypeOf(this, CaveBoyError.prototype);
    }
}