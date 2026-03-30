/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/29/2026
 * Module name:  secure-storage.classs.ts
 * File name:    secure-storage.classs
 * IDE:          WebStorm
 */

export class SecureStorage implements Storage {
  /**
   * Returns the number of data items stored in a given Storage object.
   *
   * @return {number} number of data items stored
   */
  get length(): number {
    return localStorage.length;
  }

  /**
   * Encrypts the received data
   *
   * @param value data to encrypts
   *
   */
  private static encode = (value: string) => btoa(value);

  /**
   * Decrypt the received data
   *
   * @param value data to decrypt
   */
  private static decode = (value: string) => atob(value);

  /**
   * Method that clears all keys stored
   */
  readonly clear = () => localStorage.clear();

  /**
   * Method that returns the name of the nth key received
   */
  readonly key = (index: number) => localStorage.key(index);

  /**
   * Method that will remove the received key from the store
   *
   * @param key key to will be removed from the store
   */
  readonly removeItem = (key: string) => localStorage.removeItem(key);

  /**
   * Method to set encrypted the item in the store
   *
   * @param key key to which the data are to be assigned
   * @param value Data to be stored
   */
  setItem(key: string, value: string) {
    localStorage.setItem(key, SecureStorage.encode(value));
  }

  /**
   * Method to get unencrypted a specific from the store
   *
   * @param key key of the item to get
   */
  getItem(key: string): string | null {
    const value = localStorage.getItem(key);
    if (!value) return null;
    return SecureStorage.decode(value);
  }
}
