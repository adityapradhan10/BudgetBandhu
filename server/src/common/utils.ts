/**
 * Checks if an object is empty.
 *
 * @param object - The object to be checked.
 * @returns A boolean indicating whether the object is empty or not.
 */
export const isObjectEmpty = (object: Object | null) =>
  !object || !Object.values(object).length;
