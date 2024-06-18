import { useState, useEffect } from "react";
import { fetchInvitationsToNotHold } from "./../../../controllers/ScreeningControllers";
import InvitationListItem from "./../adminListItem/InvitationListItem";
import "react-loading-skeleton/dist/skeleton.css"; //Don't forget to import the styles
import Skeleton from "react-loading-skeleton";

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

  return inviteFetchLoading ? (
    <Skeleton count={3} className="h-16 rounded-md" />
  ) : fetchInviteError ? (
    { fetchInviteError }
  ) : (
    arrayOfCompletedInvites?.map((invite, index) => (
      <InvitationListItem
        index={index}
        invite={invite}
        date={invite.date}
        time={invite.time}
        key={invite.id}
      />
    ))
  );
};

export default InvitationToNotHoldModalContent;
