import { ZipperProduct } from "@/types/product";
import { formatNumber } from "@/lib/utils";

export function SpecTable({ product }: { product: ZipperProduct }) {
  const specs = [
    { label: "Gauge", value: `${product.specs.gaugeMm} mm` },
    { label: "Tape width", value: `${product.specs.tapeWidthMm} mm` },
    { label: "Tensile strength", value: `${product.specs.tensileStrengthN} N` },
    { label: "Operating temperature", value: `${product.specs.operatingTempC[0]}°C to ${product.specs.operatingTempC[1]}°C` },
    { label: "Material", value: product.material },
    { label: "Finish", value: product.finish },
    { label: "MOQ", value: `${formatNumber(product.specs.minOrderQty)} pcs` },
    { label: "Lead time", value: `${product.specs.leadTimeDays} days` },
  ];

  return (
    <div className="rounded-xl border border-ink-200 bg-white overflow-hidden">
      {/* Desktop: two-column table */}
      <table className="hidden md:table w-full">
        <tbody className="divide-y divide-ink-100">
          {specs.map((spec, idx) => (
            <tr
              key={spec.label}
              className={idx % 2 === 0 ? "bg-white" : "bg-ink-50/50"}
            >
              <th
                scope="row"
                className="w-1/3 px-5 py-3.5 text-left text-sm font-medium text-ink-600"
              >
                {spec.label}
              </th>
              <td className="px-5 py-3.5 text-sm text-ink-900 font-medium">
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile: stacked rows */}
      <dl className="md:hidden divide-y divide-ink-100">
        {specs.map((spec) => (
          <div key={spec.label} className="px-4 py-3 flex justify-between gap-3">
            <dt className="text-sm text-ink-500">{spec.label}</dt>
            <dd className="text-sm font-medium text-ink-900 text-right">
              {spec.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* Extended specs: slider compatibility, colors, lengths */}
      <div className="border-t border-ink-100 p-5 sm:p-6 bg-ink-50/50">
        <h3 className="text-sm font-semibold text-ink-900 mb-4">
          Extended options
        </h3>
        <div className="grid sm:grid-cols-3 gap-5">
          <div>
            <p className="text-xs uppercase tracking-wider text-ink-500 mb-2">
              Slider compatibility
            </p>
            <ul className="space-y-1.5 text-sm text-ink-800">
              {product.specs.sliderCompatibility.map((s) => (
                <li key={s}>• {s}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-ink-500 mb-2">
              Color codes
            </p>
            <div className="flex flex-wrap gap-1.5">
              {product.specs.colorCodes.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center rounded-md border border-ink-200 bg-white px-2 py-0.5 text-xs font-mono text-ink-700"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-ink-500 mb-2">
              Length options
            </p>
            <div className="flex flex-wrap gap-1.5">
              {product.specs.lengthOptionsMm.map((l) => (
                <span
                  key={l}
                  className="inline-flex items-center rounded-md border border-ink-200 bg-white px-2 py-0.5 text-xs font-mono text-ink-700"
                >
                  {l} mm
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}