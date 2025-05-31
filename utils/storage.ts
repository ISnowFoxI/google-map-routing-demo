import { ValueType } from '@/types/utils';
import { MMKV } from 'react-native-mmkv';

export const storageKeys = {
  route: 'route',
};

export const storage = new MMKV({
  id: 'kidgigs-storage',
  encryptionKey: 'kidgigs-encryption-key',
});

export const save = (key: string, value: ValueType) => {
  let data = value;
  if (typeof value === 'object') {
    data = JSON.stringify(value);
  }
  storage.set(key, data);
};

export const read = (key: string) => {
  const data = storage.getString(key);
  if (data) {
    return data;
  }
  return '';
};
