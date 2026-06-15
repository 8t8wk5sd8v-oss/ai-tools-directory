import "./globals.css";
import CookieBanner from "../components/CookieBanner";

const GA_ID = "G-WZ4J40CPRQ";

export const metadata = {
  title: {
    default: "AI Tools Directory — Find the Best AI Tools for Work & Learning",
    template: "%s | AI Tools Directory",
  },
  description:
    "A curated directory of the best AI tools for writing, coding, image generation, video, research and productivity.",
  metadataBase: new URL("https://ai-tools-directory-ten-sand.vercel.app"),
  openGraph: {
    type: "website",
    siteName: "AI Tools Directory",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* GA loads but analytics_storage starts as denied (GDPR) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                analytics_storage: 'denied'
              });
            `,
          }}
        />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `,
          }}
        />
      </head>
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
