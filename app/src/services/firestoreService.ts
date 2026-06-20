import { db } from './firebase';
import { collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc, query, where, writeBatch } from 'firebase/firestore';

export const FirestoreService = {
  async getById<T>(col: string, id: string) {
    const snap = await getDoc(doc(db, col, id));
    return snap.exists() ? (snap.data() as T) : null;
  },
  async listWhere<T>(col: string, field: string, op: any, value: any) {
    const q = query(collection(db, col), where(field as any, op, value));
    const snaps = await getDocs(q);
    return snaps.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as T[];
  },
  async create(col: string, data: any) {
    const ref = await addDoc(collection(db, col), data);
    return ref.id;
  },
  async set(col: string, id: string, data: any) {
    await setDoc(doc(db, col, id), data, { merge: true });
  },
  async update(col: string, id: string, data: any) {
    await updateDoc(doc(db, col, id), data);
  },
  async remove(col: string, id: string) {
    await deleteDoc(doc(db, col, id));
  },
  async batchSet(col: string, items: { id: string; data: any }[]) {
    const b = writeBatch(db);
    items.forEach((it) => b.set(doc(db, col, it.id), it.data, { merge: true } as any));
    await b.commit();
  }
};
