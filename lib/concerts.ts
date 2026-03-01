import type { Concert } from '@/lib/types';

/**
 * Shared concert utilities used across the public site and admin dashboard.
 * Keeps month grouping logic and label formatting in one place.
 */

export type MonthGroup = {
  /** Sortable key like "2026-02" */
  key: string;
  /** Human-readable label like "March 2026" */
  label: string;
  /** Concerts in this month (preserves input order) */
  concerts: Concert[];
};

/**
 * Groups a pre-sorted array of concerts by month.
 * Input order is preserved within each group.
 */
export function groupByMonth(concerts: Concert[]): MonthGroup[] {
  const groups: MonthGroup[] = [];
  for (const c of concerts) {
    const d = new Date(c.date + 'T00:00:00');
    const key = `${d.getFullYear()}-${String(d.getMonth()).padStart(2, '0')}`;
    const label = d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    const last = groups[groups.length - 1];
    if (last && last.key === key) {
      last.concerts.push(c);
    } else {
      groups.push({ key, label, concerts: [c] });
    }
  }
  return groups;
}

/**
 * Consistent month-label inline styles.
 * Used in both the admin dashboard and the public concerts drawer
 * so they look identical.
 */
export const monthLabelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'rgba(237,232,244,0.45)',
  marginBottom: 8,
  paddingLeft: 4,
};
