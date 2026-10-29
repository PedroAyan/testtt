import map from '../data/generated/map.json';

export function AtlasCover() {
  return <div className="atlas-cover" aria-hidden="true">
    <svg viewBox="0 0 1000 510" focusable="false">
      <path d="M0 127.5H1000M0 255H1000M0 382.5H1000M250 0V510M500 0V510M750 0V510" fill="none" stroke="var(--border-control)" strokeOpacity=".18" strokeDasharray="4 8" />
      {map.map(c => <path key={c.id} className={`atlas-land land-${c.id}`} d={c.d} stroke="var(--surface)" strokeWidth="2" />)}
    </svg>
    <span className="atlas-compass">N<span>↑</span></span>
  </div>;
}
