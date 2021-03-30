/**
 * A three-character string color expression in the format 'xxx', where 'x' is a base-32 digit.
 * Must be lowercase.
 */
 export type CoilSnakeColorString = string;

 const requiredFormat: RegExp = /^([0-9a-v]{3})$/;
 
 /**
  * Return true if value meets the required type and format for a CoilSnakeColorString ('xxx').
  * @param value - A value that might be a CoilSnakeColorString.
  * @returns True if value meets the required type and format for a CoilSnakeColorString. Otherwise, false.
  */
 export function isCoilSnakeColorString(value: CoilSnakeColorString | any): value is CoilSnakeColorString {
    if (typeof value === 'string') {
        return requiredFormat.test(value);
    }
    
    return false;
 }