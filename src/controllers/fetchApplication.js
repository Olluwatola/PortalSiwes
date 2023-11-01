import { query, where, getDocs } from "firebase/firestore";

export async function fetchApplications(
  applicationCollectionRef,
  setIsLoading,
  setArrayOfApplication,
  setGetApplicationsError
) {
  setIsLoading(true);
  try {
    const q = query(
      applicationCollectionRef,
      where("hasBeenInvitedForTest", "==", false)
    );

    const data = await getDocs(q);
    const returnedApplications = data.docs?.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setArrayOfApplication(returnedApplications);
  } catch (err) {
    console.error(err);
    setGetApplicationsError(err.message);
  } finally {
    setIsLoading(false);
  }
}
