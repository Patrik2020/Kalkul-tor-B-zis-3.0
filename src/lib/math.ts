/** Demo only. Domain calculations require validated rules and reference cases. */
export function percentageOf(amount: number, percentage: number): number {
  if (!Number.isFinite(amount) || !Number.isFinite(percentage)) throw new RangeError('Finite numbers required');
  return amount * percentage / 100;
}
