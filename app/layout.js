import "./globals.css";

export const metadata = {
  title: "AI Tools Directory",
  description: "Find the best AI tools for writing, coding, images, video and productivity."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
