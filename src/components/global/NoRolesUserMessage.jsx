import CaptionCard from './CaptionCard';
import unauthorized from '../../assets/unauthorized.svg';

function NoRolesUserMessage() {
  return (
    <div className="flex-center h-full flex-col gap-3">
      <CaptionCard image={unauthorized} title="Welcome to Pro Sales" />
      <p className="text-center">You're all set to get started, but it seems you don't have any roles assigned yet.</p>
      <p className="text-center">Please reach out to your manager to unlock access to all features.</p>
    </div>
  );
}

export default NoRolesUserMessage;
