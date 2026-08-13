import "./globals.css";

export const metadata = {
  title: "Royal Oud | Luxury Fragrance Experience",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}