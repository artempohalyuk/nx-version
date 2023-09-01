import { StorageKey } from "../shared/enums";

export class StorageHelper {
  static hasItem(storage: Storage, key: StorageKey): boolean {
    return storage.getItem(key) !== null;
  }

  static getItemAsString(storage: Storage, key: StorageKey): string | null {
    if (!StorageHelper.hasItem(storage, key)) {
      return null;
    }

    return storage.getItem(key);
  }

  static getItemAsNumber(storage: Storage, key: StorageKey): number | null {
    const stringValue = StorageHelper.getItemAsString(storage, key);

    if (stringValue === null) {
      return null;
    }

    return Number(stringValue);
  }

  static getItemAsBoolean(storage: Storage, key: StorageKey): boolean | null {
    const stringValue = StorageHelper.getItemAsString(storage, key);

    if (stringValue === null) {
      return null;
    }

    // Values for booleans are stored as 1 or 0
    return !!Number(stringValue);
  }

  static getItemAsObject<T>(storage: Storage, key: StorageKey): T | null {
    try {
      return JSON.parse(storage.getItem(key) as string) as T;
    } catch (_) {
      return null;
    }
  }

  static setItem(storage: Storage, key: StorageKey, value: any): void {
    if (value == null) {
      StorageHelper.removeItem(storage, key);
      return;
    }

    if (typeof value === 'boolean') {
      // Store boolean values as 1 or 0
      value = Number(value);
    }

    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }

    storage.setItem(key, value);
  }

  static removeItem(storage: Storage, key: StorageKey): void {
    storage.removeItem(key);
  }
}
