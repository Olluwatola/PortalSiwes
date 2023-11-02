import { useState, useEffect } from "react";
import { fetchCompletedInvites } from "./../../../controllers/ScreeningControllers";
import InvitationListItem from "./../adminListItem/InvitationListItem";



const CompletedInvitationModalContent = () => {
  const [arrayOfCompletedInvites, setArrayOfCompletedInvites] = useState([]);
  const [fetchInviteError, setFetchInviteError] = useState(null);
  const [inviteFetchLoading, setInviteFetchLoading] = useState(false);

  useEffect(() => {
    fetchCompletedInvites(
      setArrayOfCompletedInvites,
      setInviteFetchLoading,
      setFetchInviteError,
      false
    );

    //   return () => {
    //     second
    //   }
  }, []);
  return inviteFetchLoading
    ? "loading...."
    : fetchInviteError
    ? { fetchInviteError }
    : arrayOfCompletedInvites?.map((invite, index) => (
        <InvitationListItem
          index={index}
          invite={invite}
          date={invite.date}
          time={invite.time}
          key={invite.id}
        />
      ));
};

export default CompletedInvitationModalContent;
