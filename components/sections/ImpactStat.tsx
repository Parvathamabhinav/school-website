import type { ImpactStat as ImpactStatData } from "@/types/school";

/**
 * One figure in the impact list: a <dt>/<dd> pair, so assistive tech reads
 * "Years of excellence: 25+" while the number leads visually.
 *
 * - Phones: a ledger row, number left and label right, hairline above.
 * - md+: a column, number over label, with a vertical hairline at its left.
 */
export function ImpactStat({ value, label }: ImpactStatData) {
  return (
    <div className="flex min-w-0 flex-row-reverse items-baseline justify-between gap-lg border-t border-border py-md md:flex-col-reverse md:justify-end md:gap-sm md:border-t-0 md:border-l md:py-0 md:pl-lg">
      <dt className="type-label max-w-48 text-right text-text-muted md:max-w-none md:text-left">{label}</dt>
      <dd className="type-h1 lining-nums">{value}</dd>
    </div>
  );
}
