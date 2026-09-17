/**
 * Unauthenticated membership flows (sign in, register, password reset).
 * No site Header/Footer — full-viewport canvas matching the auth prototypes.
 */
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-surface-canvas antialiased">
      {children}
    </div>
  );
}
