import { Schema, Document } from 'mongoose';
import { encryptData, decryptData } from '../utils/encryption';

export interface EncryptionPluginOptions {
  fields: string[];
}

function encryptMap(doc: any, field: string) {
  const mapOrObj = doc.get ? doc.get(field) : doc[field];

  if (mapOrObj instanceof Map) {
    for (const [key, value] of mapOrObj.entries()) {
      if (typeof value === 'string') mapOrObj.set(key, encryptData(value));
    }
  } else if (mapOrObj && typeof mapOrObj === 'object') {
    for (const key of Object.keys(mapOrObj)) {
      if (typeof mapOrObj[key] === 'string') mapOrObj[key] = encryptData(mapOrObj[key]);
    }
  }
}

function decryptMap(doc: any, field: string) {
  const mapOrObj = doc.get ? doc.get(field) : doc[field];

  if (mapOrObj instanceof Map) {
    for (const [key, value] of mapOrObj.entries()) {
      if (typeof value === 'string') mapOrObj.set(key, decryptData(value));
    }
  } else if (mapOrObj && typeof mapOrObj === 'object') {
    for (const key of Object.keys(mapOrObj)) {
      if (typeof mapOrObj[key] === 'string') mapOrObj[key] = decryptData(mapOrObj[key]);
    }
  }
}

export function encryptionPlugin(schema: Schema, options: EncryptionPluginOptions) {
  const { fields } = options;
  if (!fields || fields.length === 0) return;

  // Encrypt before writing to DB
  schema.pre('save', function (next) {
    fields.forEach((field) => {
      encryptMap(this, field);
      // markModified ensures Mongoose includes this field in partial $set updates
      (this as any).markModified(field);
    });
    next();
  });

  // Decrypt after loading from DB
  schema.post('init', function (doc: Document) {
    fields.forEach((field) => decryptMap(doc, field));
  });

  // Decrypt back in memory after save so callers don't see ciphertext
  schema.post('save', function (doc: Document) {
    fields.forEach((field) => decryptMap(doc, field));
  });
}
