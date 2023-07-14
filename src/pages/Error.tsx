import { Link } from 'react-router-dom';

import BaseAuxiliaryPage from '../components/BaseAuxiliaryPage/BaseAuxiliaryPage';
import PATH from '../types/PATH';

export default function Error() {
  return (
    <BaseAuxiliaryPage title="Error">
      <p>
        Something unexpected occurred. If this problem persists or is
        reproducible, please leave some <Link to={PATH.Feedback}>feedback</Link>{' '}
        detailing what happened.
      </p>
    </BaseAuxiliaryPage>
  );
}
