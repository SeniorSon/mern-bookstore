import React from "react";
import { cn } from "../../lib/Utils";

export const Table = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <table className={cn("min-w-full table-auto", className)}>{children}</table>
);

export const TableRow = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <tr className={cn("border-b", className)}>{children}</tr>
);

export const TableCell = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <td className={cn("p-2", className)}>{children}</td>
);

export const TableHead = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <th className={cn("p-2 text-left bg-gray-100", className)}>{children}</th>
);

export const TableHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <thead className={cn("", className)}>{children}</thead>
);

export const TableBody = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <tbody className={cn("", className)}>{children}</tbody>
);
