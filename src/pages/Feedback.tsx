import BaseAuxiliaryPage from '../components/BaseAuxiliaryPage/BaseAuxiliaryPage';

export default function Feedback() {
  return (
    <BaseAuxiliaryPage title="Feedback">
      <p>
        Questions? Comments? Want to report a bug? Just go to{' '}
        <a
          href="https://forms.gle/g6JEcF1E8bYBvVuD9"
          rel="noreferrer noopener"
          target="_blank"
        >
          this page
        </a>{' '}
        and fill out the form!
      </p>
    </BaseAuxiliaryPage>
  );
}
