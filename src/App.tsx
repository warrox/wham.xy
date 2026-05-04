import { Outlet } from 'react-router-dom';
import { ModeToggle } from './components/ModeToggle';

export function App() {
  return (
    <div className="app">
      <header className="app-header">
        <ModeToggle />
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer">
        <span>Warren Hamdi</span>
        <span className="dot">·</span>
        <a
          href="https://www.linkedin.com/in/warren-hamdi-1253b878/?skipRedirect=true"
          target="_blank"
          rel="noopener noreferrer"
        >
          linkedin
        </a>
        <span className="dot">·</span>
        <a href="https://github.com/warrox" target="_blank" rel="noopener noreferrer">
          github.com/warrox
        </a>
      </footer>
    </div>
  );
}
