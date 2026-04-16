export const metadata = {
  title: 'Signal Lab UI',
  description: 'Minimal UI for Signal Lab',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
