import NotCompletedInvitationPanel from "./../../components/adminComponents/NotCompletedInvitationPanel";
import CompletedInvitationsPanel from "./../../components/adminComponents/CompletedInvitationsPanel";
import ApplicantsNotInvited from "./../../components/adminComponents/ApplicantsNotInvited";

const ScreeningPage = () => {
  return (
    <>
      <h1>Screening</h1><br/>
      <NotCompletedInvitationPanel /><br/>
      <CompletedInvitationsPanel />
      <ApplicantsNotInvited/>
      
    </>
  );
};

export default ScreeningPage;
