import { db } from "../config/firebase";
import {
  query,
  //   where,
  getDocs,
  deleteDoc,
  collection,
  updateDoc,
  doc,
  //   getDoc,
} from "firebase/firestore";
import { updateObjectPropertyInStateArray } from "../utils/updateObjectPropertyInStateArray";
const testimonialCollectionRef = collection(db, "testimonial");

export async function fetchTestimonials(
  setReturnedTestimonials,
  setConditionGood,
  setStatusBarMessage
) {
  try {
    const q = query(testimonialCollectionRef);
    const data = await getDocs(q);
    const mappedTestimonials = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setReturnedTestimonials(mappedTestimonials);
  } catch (err) {
    setConditionGood("loading");
    setStatusBarMessage(`error ${err.message}`);
  }
}

export async function approveTestimonial(
  index,
  id,
  setConditionGood,
  setStatusBarMessage,
  returnedTestimonials,
  setReturnedTestimonials
) {
  const testimonialDocumentRef = doc(db, "testimonial", id);
  try {
    setConditionGood("loading");
    setStatusBarMessage("approving testimonial....");
    await updateDoc(testimonialDocumentRef, {
      hasBeenDisplayApproved: true,
    }).then(() => {
      updateObjectPropertyInStateArray(
        index,
        true,
        "hasBeenDisplayApproved",
        returnedTestimonials,
        setReturnedTestimonials
      );
      setConditionGood("good");
      setStatusBarMessage("approved testimonial....");
      console.log(`we have updated ${id}`);
    });
  } catch (error) {
    console.log(error);
    setConditionGood("error");
    setStatusBarMessage("error 505: approving testimonial");
  }
}

export async function unapproveTestimonial(
  index,
  id,
  setConditionGood,
  setStatusBarMessage,
  returnedTestimonials,
  setReturnedTestimonials
) {
  const testimonialDocumentRef = doc(db, "testimonial", id);
  try {
    setConditionGood("loading");
    setStatusBarMessage("unapproving testimonial....");
    await updateDoc(testimonialDocumentRef, {
      hasBeenDisplayApproved: false,
    }).then(() => {
      updateObjectPropertyInStateArray(
        index,
        false,
        "hasBeenDisplayApproved",
        returnedTestimonials,
        setReturnedTestimonials
      );
      setConditionGood("good");
      setStatusBarMessage("unapproved testimonial....");
      console.log(`we have updated ${id}`);
    });
  } catch (error) {
    console.log(error);
    setConditionGood("error");
    setStatusBarMessage("error 505: unapproving testimonial");
  }
}

export async function deleteTestimony(
  index,
  id,
  setConditionGood,
  setStatusBarMessage,
  returnedTestimonials,
  setReturnedTestimonials
) {
  const testimonialDocumentRef = doc(db, "testimonial", id);
  try {
    setConditionGood("loading");
    setStatusBarMessage("deleting testimonial....");
    await deleteDoc(testimonialDocumentRef).then(() => {
      setReturnedTestimonials(
        returnedTestimonials.filter((obj) => obj.id !== id)
      );
      setConditionGood("good");
      setStatusBarMessage(`successfully deleted testimonial`);
    });
  } catch (error) {
    console.log(error);
    setConditionGood("error");
    setStatusBarMessage("error 500: deleting testimonial");
  }
}
