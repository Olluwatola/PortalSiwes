import NotCompletedInvitationPanel from "./../../components/adminComponents/NotCompletedInvitationPanel";
import CompletedInvitationsPanel from "./../../components/adminComponents/CompletedInvitationsPanel";
import ApplicantsNotInvited from "./../../components/adminComponents/ApplicantsNotInvited";

const ScreeningPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <span className="text-3xl font-medium">Screening</span>
      <div className="flex gap-10">
        <NotCompletedInvitationPanel buttonShow={false} />
        <CompletedInvitationsPanel />
      </div>
      <ApplicantsNotInvited />
    </div>
  );
};

export default ScreeningPage;
