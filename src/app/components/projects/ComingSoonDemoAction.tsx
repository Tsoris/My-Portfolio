import { FaArrowRight } from 'react-icons/fa';
import ProjectActionPopover from './ProjectActionPopover';

interface ComingSoonDemoActionProps {
  milestoneLink: string;
}

const ComingSoonDemoAction = ({ milestoneLink }: ComingSoonDemoActionProps) => (
  <ProjectActionPopover
    icon={<FaArrowRight className='h-4 w-4' aria-hidden />}
    label='View Demo'
    dialogLabel='Drop In Chess demo status'
    message={
      <p>
        <strong>Demo coming soon.</strong> Follow the project&apos;s current
        progress in the development milestones.
      </p>
    }
    actionHref={milestoneLink}
    actionLabel='View Current Milestone'
  />
);

export default ComingSoonDemoAction;
