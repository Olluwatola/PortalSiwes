import { useState, useEffect } from "react";
import { fetchInvitationsToNotHold } from "./../../../controllers/ScreeningControllers";
import InvitationListItem from "./../adminListItem/InvitationListItem";

const InvitationToNotHoldModalContent = () => {
  const [arrayOfCompletedInvites, setArrayOfCompletedInvites] = useState([]);
  const [fetchInviteError, setFetchInviteError] = useState(null);
  const [inviteFetchLoading, setInviteFetchLoading] = useState(false);

  useEffect(() => {
    fetchInvitationsToNotHold(
      setArrayOfCompletedInvites,
      setInviteFetchLoading,
      setFetchInviteError
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

export default InvitationToNotHoldModalContent;
