import type { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

export default function Table({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-stone-200">
      <div className="overflow-x-auto">
        <table
          className={clsx("w-full border-collapse text-sm", className)}
          {...props}
        >
          {children}
        </table>
      </div>
    </div>
  );
}

export function THead({
  className,
  ...props
}: ComponentPropsWithoutRef<"thead">) {
  return <thead className={clsx("bg-stone-100", className)} {...props} />;
}

export function TBody({
  className,
  ...props
}: ComponentPropsWithoutRef<"tbody">) {
  return (
    <tbody
      className={clsx("[&>tr:last-child>td]:border-b-0", className)}
      {...props}
    />
  );
}

export function Tr({ className, ...props }: ComponentPropsWithoutRef<"tr">) {
  return (
    <tr
      className={clsx(
        "even:bg-stone-50 hover:bg-stone-100/70 transition-colors",
        className,
      )}
      {...props}
    />
  );
}

export function Th({ className, ...props }: ComponentPropsWithoutRef<"th">) {
  return (
    <th
      className={clsx(
        "whitespace-nowrap border-b border-stone-300 px-4 py-2.5 text-left font-semibold text-stone-700",
        className,
      )}
      {...props}
    />
  );
}

export function Td({ className, ...props }: ComponentPropsWithoutRef<"td">) {
  return (
    <td
      className={clsx(
        "border-b border-stone-100 px-4 py-2.5 align-top text-stone-600",
        className,
      )}
      {...props}
    />
  );
}
