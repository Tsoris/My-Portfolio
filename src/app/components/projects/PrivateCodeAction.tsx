import { FaLock } from 'react-icons/fa';
import ProjectActionPopover from './ProjectActionPopover';

interface PrivateCodeActionProps {
  className?: string;
}

const PrivateCodeAction = ({ className = '' }: PrivateCodeActionProps) => (
  <ProjectActionPopover
    className={className}
    icon={<FaLock className='h-4 w-4' aria-hidden />}
    label='Code'
    dialogLabel='Coursework source access'
    message={
      <p>
        This coursework source is kept private to protect academic integrity.
        I&apos;m happy to discuss the implementation or provide access when
        appropriate—please reach out.
      </p>
    }
    actionHref='/contact'
    actionLabel='Contact Me'
  />
);

export default PrivateCodeAction;
