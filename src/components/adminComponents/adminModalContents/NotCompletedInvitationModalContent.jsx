import { useEffect, useState } from "react";
import { fetchInvites } from "./../../../controllers/ScreeningControllers";
import InvitationListItem from "./../adminListItem/InvitationListItem";

const NotCompletedInvitationModalContent = () => {
  const [arrayOfInvites, setArrayOfInvites] = useState([]);
  const [fetchInviteError, setFetchInviteError] = useState(null);
  const [inviteFetchLoading, setInviteFetchLoading] = useState(false);

  useEffect(() => {
    fetchInvites(
      setArrayOfInvites,
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
    : arrayOfInvites?.map((invite, index) => (
        <InvitationListItem
          invite={invite}
          index={index}
          date={invite.date}
          time={invite.time}
          key={invite.id}
        />
      ));
};

export default NotCompletedInvitationModalContent;
