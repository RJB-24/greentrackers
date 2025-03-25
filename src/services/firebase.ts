import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, DocumentData, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCH4dRTpZCJt6sXuCBHvLyHOW1bS3ZvSEQ",
  authDomain: "greentrackers.firebaseapp.com",
  projectId: "greentrackers",
  storageBucket: "greentrackers.firebasestorage.app",
  messagingSenderId: "30040997857",
  appId: "1:30040997857:web:5e46971bb7b37f9468dca0",
  measurementId: "G-000MG7ZLDB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

// Auth functions
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Firestore functions
export const addDocument = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};

export const getDocuments = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    return documents;
  } catch (error) {
    console.error("Error getting documents:", error);
    throw error;
  }
};

export const getDocumentsByField = async (collectionName: string, field: string, value: any) => {
  try {
    const q = query(collection(db, collectionName), where(field, "==", value));
    const querySnapshot = await getDocs(q);
    const documents: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    return documents;
  } catch (error) {
    console.error("Error getting documents by field:", error);
    throw error;
  }
};

export const updateDocument = async (collectionName: string, docId: string, data: any) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

export const deleteDocument = async (collectionName: string, docId: string) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    return true;
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};

// Storage functions
export const uploadFile = async (file: File, path: string) => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export { app, auth, db, storage, analytics };
