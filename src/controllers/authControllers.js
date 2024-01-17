import { auth, db } from "./../config/firebase";
import {
  getDoc,
  getDocs,
  updateDoc,
  collection,
  doc,
  setDoc,
} from "firebase/firestore";
import { signOut, updatePassword } from "firebase/auth";
import { updateObjectPropertyInStateArray } from "./../utils/updateObjectPropertyInStateArray";

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

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
    // console.log(userAuthID);
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

export const handleCreateAdminProfileDocument = async (
  setSignUpErrorMessage,
  setAdminProfileCreationLoading,
  email,
  userAuthID
) => {
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

export async function changeAdminPassword(
  loginEmail,
  loginPassword,
  newPassword,
  confirmNewPassword,
  setLoginEmail,
  setLoginPassword,
  setNewPassword,
  setConfirmNewPassword,
  setConditionGood,
  setStatusBarMessage
) {
  //first, attempt to login to confirm that the email to password matches
  setConditionGood("loading");
  setStatusBarMessage("changing your  password...");
  try {
    //confirm if email inputted is users's email
    if (loginEmail === auth.currentUser.email) {
      if (newPassword === confirmNewPassword) {
        await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
          .then(async () => {
            const user = auth.currentUser;
            await updatePassword(user, newPassword)
              .then(() => {
                setConditionGood("good");
                setStatusBarMessage("success changed your  password");
                setLoginEmail("");
                setLoginPassword("");
                setNewPassword("");
                setConfirmNewPassword("");
                return;
              })
              .catch((error) => {
                setConditionGood("error");
                setStatusBarMessage(
                  `error: changing password ${error.message}`
                );
                return;
              });
          })
          .catch((error) => {
            setConditionGood("error");
            setStatusBarMessage(
              `error: confirming old password, review email and current password ${error.message}`
            );
            return;
          });
      } else {
        setConditionGood("error");
        setStatusBarMessage("password and confirm password do not match");
        return;
      }
    } else {
      setConditionGood("error");
      setStatusBarMessage("invalid email, input your email correctly");
      return;
    }
  } catch (error) {
    setConditionGood("error");
    setStatusBarMessage("500 error: changing password");
    return;
  }
}

export async function fetchAllAdminProfiles(
  setAdminsArray,
  setConditionGood,
  setStatusBarMessage
) {
  try {
    const adminsCollectionRef = collection(db, "admins");
    const data = await getDocs(adminsCollectionRef);
    const mappedAdmins = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setAdminsArray(mappedAdmins);
    console.log(mappedAdmins);
  } catch (error) {
    setConditionGood("error");
    setStatusBarMessage(`500 error, failed to fetch `);
  }
}

export async function grantAdminAccessController(
  index,
  id,
  setConditionGood,
  setStatusBarMessage,
  returnedTestimonials,
  setReturnedTestimonials
) {
  const adminDocRef = doc(db, "admins", id);
  try {
    setConditionGood("loading");
    setStatusBarMessage("granting admin access....");
    await updateDoc(adminDocRef, {
      role: "admin",
    }).then(() => {
      updateObjectPropertyInStateArray(
        index,
        "admin",
        "role",
        returnedTestimonials,
        setReturnedTestimonials
      );
      setConditionGood("good");
      setStatusBarMessage("admin role granted");
      console.log(`we have updated ${id}`);
    });
  } catch (error) {
    console.log(error);
    setConditionGood("error");
    setStatusBarMessage("error 505: admin grant unsuccessful");
  }
}

export async function revokeAdminAccessController(
  index,
  id,
  setConditionGood,
  setStatusBarMessage,
  returnedTestimonials,
  setReturnedTestimonials
) {
  const adminDocRef = doc(db, "admins", id);
  try {
    setConditionGood("loading");
    setStatusBarMessage("revoking admin access....");
    await updateDoc(adminDocRef, {
      role: "unverifiedAdmin",
    }).then(() => {
      updateObjectPropertyInStateArray(
        index,
        "unverifiedAdmin",
        "role",
        returnedTestimonials,
        setReturnedTestimonials
      );
      setConditionGood("good");
      setStatusBarMessage("admin role revoked");
      console.log(`we have updated ${id}`);
    });
  } catch (error) {
    console.log(error);
    setConditionGood("error");
    setStatusBarMessage("error 505: admin revoke unsuccessful");
  }
}

export async function resetPassword(
  resetPasswordEmail,
  setConditionGood,
  setStatusBarMessage
) {
  try {
    await sendPasswordResetEmail(auth, resetPasswordEmail);
    setConditionGood("good");
    setStatusBarMessage("Mail reset password set");
  } catch (error) {
    setConditionGood("error");
    if (error.code === "auth/invalid-email") {
      setStatusBarMessage("invalid email");
    } else if (error.code === "auth/user-not-found") {
      setStatusBarMessage("user not found");
    } else {
      setStatusBarMessage("error 500: failed to reset password");
    }
  }
}
