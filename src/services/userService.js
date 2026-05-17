import { db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

// CREATE USER PROFILE
export const createUserProfile = async (user) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);

  await setDoc(userRef, {
    uid: user.uid,
    email: user.email,
    createdAt: new Date(),
    skills: [],
    bio: "",
    connections: [],
  });
};

// GET USER PROFILE
export const getUserProfile = async (uid) => {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);

  if (snap.exists()) {
    return snap.data();
  }

  return null;
};