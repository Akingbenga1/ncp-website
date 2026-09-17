/** Pure helpers for member profile UI — safe on server and client. */

export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "NCP";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
}

export function formatMemberCode(id: string): string {
  const digits = id.replace(/\D/g, "").slice(-4).padStart(4, "0");
  return `NCP-${digits}-PE`;
}
