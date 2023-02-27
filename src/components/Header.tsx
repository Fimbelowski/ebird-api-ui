import ApiKeyInput from './ApiKeyInput';
import Nav from './Nav';

export default function Header() {
  return (
    <header className="header">
      <h1>eBird API UI</h1>
      <ApiKeyInput />
      <Nav />
    </header>
  );
}
