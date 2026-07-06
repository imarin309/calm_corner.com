import type { ComponentPropsWithoutRef } from "react";

export default function Table({
  children,
  ...props
}: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-stone-200">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm" {...props}>
          {children}
        </table>
      </div>
    </div>
  );
}

export function THead(props: ComponentPropsWithoutRef<"thead">) {
  return <thead className="bg-stone-100" {...props} />;
}

export function TBody(props: ComponentPropsWithoutRef<"tbody">) {
  return <tbody className="[&>tr:last-child>td]:border-b-0" {...props} />;
}

export function Tr(props: ComponentPropsWithoutRef<"tr">) {
  return (
    <tr
      className="even:bg-stone-50 hover:bg-stone-100/70 transition-colors"
      {...props}
    />
  );
}

export function Th(props: ComponentPropsWithoutRef<"th">) {
  return (
    <th
      className="whitespace-nowrap border-b border-stone-300 px-4 py-2.5 text-left font-semibold text-stone-700"
      {...props}
    />
  );
}

export function Td(props: ComponentPropsWithoutRef<"td">) {
  return (
    <td
      className="border-b border-stone-100 px-4 py-2.5 align-top text-stone-600"
      {...props}
    />
  );
}
