export function StatusBadge({ status }: { status: 'canonical' | 'demo' }) {
  if (status === 'canonical') return <span className="status-badge status-badge--canonical">SSC catalog item</span>
  return <span className="status-badge status-badge--demo">Demonstration listing — noncanonical</span>
}
