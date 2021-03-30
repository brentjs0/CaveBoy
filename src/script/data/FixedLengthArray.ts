/**
 * A const array with a specific length.
 * @template TItem - The type of the items in the array.
 * @template TLength - A number type literal representing the length of the array.
 */
export default interface FixedLengthArray<TItem, TLength extends number> extends Array<TItem> {
    length: TLength
}