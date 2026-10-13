export function Loader({ label = "Opening your workspace" }: { label?: string }) {
  return <div className="cms-loader" role="status" aria-live="polite"><div className="cms-loader-track"><span /></div><span className="cms-sr-only">{label}</span></div>;
}
