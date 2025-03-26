
import { 
  loginUser, 
  registerUser, 
  logoutUser, 
  getCurrentUser 
} from './firebase';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export const signIn = async (email: string, password: string) => {
  try {
    const user = await loginUser(email, password);
    return user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    const user = await registerUser(email, password);
    return user;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await logoutUser();
    return true;
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

export const getCurrentAuthUser = (): AuthUser | null => {
  const firebaseUser = getCurrentUser();
  if (!firebaseUser) {
    return null;
  }

  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL
  };
};
