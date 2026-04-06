import type { Metadata } from "next";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ANRA Studio - ვებსაიტების დამზადება",
    template: "%s | ANRA Studio",
  },
  description:
    "ANRA Studio ქმნის თანამედროვე, სწრაფ და SEO ოპტიმიზირებულ ვებსაიტებს ბიზნესებისთვის.",
  keywords: [
    "ვებსაიტი",
    "საიტების დამზადება",
    "saitebis damzadeba",
    "saitebi",
    "saitebi iafad",
    "vebsaiti iafad",
    "საიტი იაფად",
    "web development",
    "Next.js",
    "React",
    "SEO",
    "ANRA Studio",
  ],
  authors: [{ name: "ANRA Studio" }],
  creator: "ANRA Studio",

  openGraph: {
    title: "ANRA Studio",
    description: "პროფესიონალური ვებსაიტების შექმნა",
    url: "https://your-domain.com",
    siteName: "ANRA Studio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ka_GE",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "ANRA Studio",
    description: "ვებსაიტების დამზადება",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
