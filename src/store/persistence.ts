import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface MasqueradeDB extends DBSchema {
  designs: {
    key: string;
    value: {
      id: string;
      name: string;
      data: string; // JSON stringified tldraw document
      thumbnail?: string;
      createdAt: number;
      updatedAt: number;
    };
    indexes: { 'by-updated': number };
  };
  templates: {
    key: string;
    value: {
      id: string;
      name: string;
      category: string;
      data: string;
      thumbnail?: string;
    };
  };
}

let dbInstance: IDBPDatabase<MasqueradeDB> | null = null;

export async function getDB(): Promise<IDBPDatabase<MasqueradeDB>> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<MasqueradeDB>('masquerade-db', 1, {
    upgrade(db) {
      // Designs store
      const designStore = db.createObjectStore('designs', { keyPath: 'id' });
      designStore.createIndex('by-updated', 'updatedAt');

      // Templates store
      db.createObjectStore('templates', { keyPath: 'id' });
    },
  });

  return dbInstance;
}

export interface SavedDesign {
  id: string;
  name: string;
  data: string;
  thumbnail?: string;
  createdAt: number;
  updatedAt: number;
}

// Design operations
export async function saveDesign(design: Omit<SavedDesign, 'createdAt' | 'updatedAt'>): Promise<void> {
  const db = await getDB();
  const existing = await db.get('designs', design.id);
  const now = Date.now();

  await db.put('designs', {
    ...design,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  });
}

export async function getDesign(id: string): Promise<SavedDesign | undefined> {
  const db = await getDB();
  return db.get('designs', id);
}

export async function getAllDesigns(): Promise<SavedDesign[]> {
  const db = await getDB();
  return db.getAllFromIndex('designs', 'by-updated');
}

export async function deleteDesign(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('designs', id);
}

// Export/Import helpers
export function exportDesignToJSON(design: SavedDesign): string {
  return JSON.stringify({
    name: design.name,
    data: design.data,
    exportedAt: Date.now(),
    version: '1.0.0',
  }, null, 2);
}

export function downloadDesign(design: SavedDesign): void {
  const json = exportDesignToJSON(design);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${design.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.masquerade.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function importDesignFromFile(file: File): Promise<SavedDesign> {
  const text = await file.text();
  const imported = JSON.parse(text);
  
  const design: SavedDesign = {
    id: crypto.randomUUID(),
    name: imported.name || 'Imported Design',
    data: imported.data,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  await saveDesign(design);
  return design;
}
