import { db } from "./../config/firebase";
import {
  query,
  where,
  getDocs,
  collection,
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";

const contactUsInfoDocRef = doc(db, "contactUsInfo", "Jyean7rGwP0FJDHRQUwI");

export async function loadUiDetails(
  setLoadUiDetailsLoading,
  setAboutUs,
  setAddress,
  setContactUsEmail,
  setContactUsNumber,
  setConditionGood,
  setStatusBarMessage
) {
  setLoadUiDetailsLoading(true);
  try {
    let returnedContactUsInfoDoc = await getDoc(contactUsInfoDocRef);
    console.log(returnedContactUsInfoDoc.data());
    setAboutUs(returnedContactUsInfoDoc.data().aboutUs);
    setAddress(returnedContactUsInfoDoc.data().address);
    setContactUsEmail(returnedContactUsInfoDoc.data().contactUsEmail);
    setContactUsNumber(returnedContactUsInfoDoc.data().contactUsNumber);
  } catch (error) {
    setConditionGood("error");
    setStatusBarMessage(`500 Internal server error: fetching details`);
  }
}

export async function updateUiDetails(
  aboutUs,
  address,
  contactUsEmail,
  contactUsNumber,
  setConditionGood,
  setStatusBarMessage
) {
  try {
    setConditionGood("loading");
    setStatusBarMessage(`updating details....`);
    await updateDoc(contactUsInfoDocRef, {
      aboutUs: aboutUs,
      address: address,
      contactUsEmail: contactUsEmail,
      contactUsNumber: contactUsNumber,
    }).then(() => {
      setConditionGood("good");
      setStatusBarMessage("updated main app UI details successfully");
      console.log("we have updated");
    });
  } catch (error) {
    setConditionGood("error");
    setStatusBarMessage(`500 error, failed to update ${error.message}`);
    console.log(error);
  }
}

export async function updateFAQ(
  id,
  setConditionGood,
  setStatusBarMessage,
  faqQuestion,
  faqAnswer
) {
  const FAQDocRef = doc(db, "faqs", id);
  setConditionGood("loading");
  setStatusBarMessage("updating FAQ....");
  try {
    await updateDoc(FAQDocRef, {
      question: faqQuestion,
      answer: faqAnswer,
    }).then(() => {
      setConditionGood("good");
      setStatusBarMessage(`successfully updated FAQ ${id}`);
    });
  } catch (error) {
    setConditionGood("error");
    setStatusBarMessage(`500 error: could not update FAQ ${id}`);
  }
}

export async function deleteFaq(id, setConditionGood, setStatusBarMessage,faqArray,setFaqArray) {
  const FAQDocRef = doc(db, "faqs", id);
  setConditionGood("loading");
  setStatusBarMessage("deleting FAQ....");
  try {
    await deleteDoc(FAQDocRef).then(() => {
      setFaqArray( faqArray.filter(obj => obj.id !== id))
      setConditionGood("good");
      setStatusBarMessage(`successfully deleted FAQ ${id}`);
    });
  } catch (error) {
    setConditionGood("error");
    setStatusBarMessage(`500 error: could not delete FAQ ${id}`);
  }
}

export async function createNewFAQ(
  newQuestion,
  newAnswer,
  setConditionGood,
  setStatusBarMessage,
  faqArray,
  setFaqArray
) {
  const FAQColRef = collection(db, "faqs");
  setConditionGood("loading");
  setStatusBarMessage("creating new FAQ....");
  try {
    await addDoc(FAQColRef, {
      question: newQuestion,
      answer: newAnswer,
    }).then((data) => {
      setFaqArray([
        ...faqArray,
        {
          question: newQuestion,
          answer: newAnswer,
          id: data.id,
        },
      ]);
      console.log(data);
      setConditionGood("good");
      setStatusBarMessage(`successfully created new FAQ `);
    });
  } catch (error) {
    setConditionGood("error");
    setStatusBarMessage(`500 error: could not create FAQ `);
  }
}
