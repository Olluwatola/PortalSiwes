import { db } from "../config/firebase";
import {
  query,
  where,
  getDocs,
  collection,
  orderBy,
  limit,
  updateDoc,
  getDoc,
  doc,
} from "firebase/firestore";

const InvitationCollectionRef = collection(db, "invitations");

export async function fetchInvites(
  setArrayOfInvites,
  setInviteFetchLoading,
  setFetchInviteError,
  toBeLimited
) {
  try {
    setInviteFetchLoading(true);
    let q;
    if (toBeLimited) {
      q = query(
        InvitationCollectionRef,
        where("hasHeld", "==", false),
        where("toNotHold", "==", false),
        orderBy("timestamp", "asc"),
        limit(5)
      );
    } else {
      q = query(
        InvitationCollectionRef,
        where("hasHeld", "==", false),
        where("toNotHold", "==", false),
        orderBy("timestamp", "asc")
      );
    }
    const data = await getDocs(q);
    const returnedInvites = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setArrayOfInvites(returnedInvites);
    setInviteFetchLoading(false);
  } catch (error) {
    console.log(error);
    setFetchInviteError(error.message);
    setInviteFetchLoading(false);
  } finally {
    setInviteFetchLoading(false);
  }
}

export async function fetchOneInvite(
  invitationId,
  setReturnedInviteDocument,
  setInviteFetchLoading,
  setFetchInviteError
) {
  try {
    setInviteFetchLoading(true);
    const studentApplicationDocumentRef = doc(db, "invitations", invitationId);
    let returnedApplication = await getDoc(studentApplicationDocumentRef);
    console.log(returnedApplication.data());
    setReturnedInviteDocument({
      ...returnedApplication.data(),
      id: returnedApplication._key.path.segments[1],
    });
    setInviteFetchLoading(false);
  } catch (error) {
    console.log(error);
    setFetchInviteError(error.message);
    setInviteFetchLoading(false);
  } finally {
    setInviteFetchLoading(false);
  }
}

export async function fetchInvitationsToNotHold(
  setArrayOfInvites,
  setInviteFetchLoading,
  setFetchInviteError
) {
  try {
    setInviteFetchLoading(true);
    let q;
    q = query(
      InvitationCollectionRef,
      where("toNotHold", "==", true),
      orderBy("timestamp", "asc")
    );
    const data = await getDocs(q);
    const returnedInvites = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setArrayOfInvites(returnedInvites);
    setInviteFetchLoading(false);
  } catch (error) {
    console.log(error);
    setFetchInviteError(error?.message);
    setInviteFetchLoading(false);
  } finally {
    setInviteFetchLoading(false);
  }
}

export async function fetchCompletedInvites(
  setArrayOfInvites,
  setInviteFetchLoading,
  setFetchInviteError,
  toBeLimited
) {
  try {
    setInviteFetchLoading(true);
    let q;
    if (toBeLimited) {
      q = query(
        InvitationCollectionRef,
        where("hasHeld", "==", true),
        where("toNotHold", "==", false),
        orderBy("timestamp", "asc"),
        limit(5)
      );
    } else {
      q = query(
        InvitationCollectionRef,
        where("hasHeld", "==", true),
        where("toNotHold", "==", false),
        orderBy("timestamp", "asc")
      );
    }
    const data = await getDocs(q);
    const returnedInvites = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setArrayOfInvites(returnedInvites);
    setInviteFetchLoading(false);
  } catch (error) {
    console.log(error);
    setFetchInviteError(error?.message);
    setInviteFetchLoading(false);
  } finally {
    setInviteFetchLoading(false);
  }
}

export async function markInviteHasHeld(
  id,
  returnedInviteDocument,
  setReturnedInviteDocument,
  setMarkInviteLoading,
  setMarkInviteError
) {
  const applicationDocumentRef = doc(db, "invitations", id);

  setMarkInviteLoading(true);
  try {
    await updateDoc(applicationDocumentRef, {
      hasHeld: true,
    }).then(() => {
      setReturnedInviteDocument({
        ...returnedInviteDocument,
        hasHeld: true,
      });
      console.log(`we have updated ${id}`);
    });
    setMarkInviteLoading(false);
    //.filter((doc) => !doc.isRejected && !doc.isAccepted);
  } catch (err) {
    console.error(err);
    setMarkInviteError(err);
    setMarkInviteLoading(false);
  } finally {
    setMarkInviteLoading(false);
  }
}

export async function markInviteToNotHold(
  id,
  returnedInviteDocument,
  setReturnedInviteDocument,
  setMarkInviteLoading,
  setMarkInviteError
) {
  const applicationDocumentRef = doc(db, "invitations", id);

  setMarkInviteLoading(true);
  try {
    await updateDoc(applicationDocumentRef, {
      toNotHold: true,
    }).then(() => {
      setReturnedInviteDocument({
        ...returnedInviteDocument,
        toNotHold: true,
      });
      console.log(`we have updated ${id}`);
    });
    setMarkInviteLoading(false);
    //.filter((doc) => !doc.isRejected && !doc.isAccepted);
  } catch (err) {
    console.error(err);
    setMarkInviteError(err);
    setMarkInviteLoading(false);
  } finally {
    setMarkInviteLoading(false);
  }
}

export async function unmarkInviteToNotHold(
  id,
  returnedInviteDocument,
  setReturnedInviteDocument,
  setMarkInviteLoading,
  setMarkInviteError
) {
  const applicationDocumentRef = doc(db, "invitations", id);

  setMarkInviteLoading(true);
  try {
    await updateDoc(applicationDocumentRef, {
      toNotHold: false,
    }).then(() => {
      setReturnedInviteDocument({
        ...returnedInviteDocument,
        toNotHold: false,
      });
      console.log(`we have updated ${id}`);
    });
    setMarkInviteLoading(false);
    //.filter((doc) => !doc.isRejected && !doc.isAccepted);
  } catch (err) {
    console.error(err);
    setMarkInviteError(err);
    setMarkInviteLoading(false);
  } finally {
    setMarkInviteLoading(false);
  }
}

export async function markInviteHasNotHeld(
  id,
  returnedInviteDocument,
  setReturnedInviteDocument,
  setMarkInviteLoading,
  setMarkInviteError
) {
  const applicationDocumentRef = doc(db, "invitations", id);

  setMarkInviteLoading(true);
  try {
    await updateDoc(applicationDocumentRef, {
      hasHeld: false,
    }).then(() => {
      setReturnedInviteDocument({
        ...returnedInviteDocument,
        hasHeld: false,
      });
      console.log(`we have updated ${id}`);
    });
    setMarkInviteLoading(false);
    //.filter((doc) => !doc.isRejected && !doc.isAccepted);
  } catch (err) {
    console.error(err);
    setMarkInviteError(err);
    setMarkInviteLoading(false);
  } finally {
    setMarkInviteLoading(false);
  }
}
