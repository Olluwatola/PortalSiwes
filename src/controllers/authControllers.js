import { auth, db } from "./../config/firebase";
import { getDoc, 
    collection,
     doc, 
    setDoc
 } from "firebase/firestore";
import { signOut } from "firebase/auth";

const adminRef = collection(db, "admins");

export const signUserOut = async () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      window.location.href = window.location.origin + "/admin/auth";
    })
    .catch((error) => {
        
      // An error happened.
    });
};

export const handleGetUserProfile = async (userAuthID) => {
  try {
    console.log(userAuthID);
    const docRef = doc(db, "admins", userAuthID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data());
      auth.currentFirestoreProfile = docSnap.data();
      return auth.currentFirestoreProfile;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      throw new Error(
        "An error has occured with your admin application process, report an issue"
      );
    }
  } catch (error) {
    console.log(`from inside hguparr ${error}`);
    throw error;
  }
};

export const handleGetUserProfileAndReturnRole = async (userAuthID) => {
  try {
    const docRef = doc(db, "admins", userAuthID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      auth.currentFirestoreProfile = docSnap.data();
      return auth.currentFirestoreProfile.role;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      throw new Error(
        "An error has occured with your admin application process, report an issue"
      );
    }
  } catch (error) {
    console.log(`from inside hguparr ${error}`);
    throw error;
  }
};

export const handleCreateAdminProfileDocument = async (setSignUpErrorMessage,setAdminProfileCreationLoading,email, userAuthID) => {
  try {
    setAdminProfileCreationLoading(true);
    await setDoc(doc(adminRef, userAuthID), {
      email: email,
      role: "unverifiedAdmin",
      userAuthID: userAuthID,
    });
    setAdminProfileCreationLoading(false);
    setSignUpErrorMessage("you have successfully applied to be an admin");
  } catch (err) {
   // throw err;
  }
};
