import { Link } from 'react-router-dom';

import BaseAuxiliaryPage from '../components/BaseAuxiliaryPage/BaseAuxiliaryPage';
import PATHS from '../types/PATHS';

export default function Error() {
  return (
    <BaseAuxiliaryPage title="Error">
      <p>
        Something unexpected occurred. If this problem persists or is
        reproducible, please leave some{' '}
        <Link to={PATHS.Feedback}>feedback</Link> detailing what happened.
      </p>
    </BaseAuxiliaryPage>
  );
}
