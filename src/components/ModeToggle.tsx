import { useNavigate, useLocation } from 'react-router-dom';

export function ModeToggle() {
  const navigate = useNavigate();
  const location = useLocation();
  const isPerso = location.pathname.startsWith('/perso');

  const toggle = () => {
    navigate(isPerso ? '/' : '/perso');
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isPerso}
      aria-label={isPerso ? 'Switch to engineer mode' : 'Switch to personal mode'}
      className={`mode-toggle ${isPerso ? 'perso' : 'engineer'}`}
      onClick={toggle}
    >
      <span className="mode-toggle-ring" aria-hidden="true" />
      <span className="mode-toggle-slot slot-engineer" aria-hidden="true">⚙️</span>
      <span className="mode-toggle-slot slot-perso" aria-hidden="true">🎉</span>
    </button>
  );
}
