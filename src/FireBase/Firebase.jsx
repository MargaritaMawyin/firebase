// import firebase from 'firebase';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL, getBytes } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, addDoc, getDocs, query, doc, getDoc, where, setDoc, deleteDoc } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_URL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export async function userExist(uid) {
  const docRef = doc(db, 'users', uid);
  const res = await getDoc(docRef);
  console.log(res)
  return res.exists();
}

export async function existUsername(username) {
  const users = [];
  const docRef = collection(db, 'users');
  const q = query(docRef, where('username', '==', username));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(doc => {
    users.push(doc.data());
  });

  return users.length > 0 ? users[0].uid : null;
}

export async function registerNewUser(user) {
  try {
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  } catch (error) { }

}

export async function updateUser(user) {
  try {
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  } catch (error) { }
}

export async function getUserInfo(uid) {
  try {
    const docRef = doc(db, "users", uid);
    const document = await getDoc(docRef)
    return document.data();
  } catch (error) { }

}

export async function insertNewLink(link) {
  try {
    const linksRef = collection(db, "links");
    const res = await addDoc(linksRef, link);
    return res;
    

  } catch (error) {
    console.error(error)
  }
}