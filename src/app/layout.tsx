import type { Metadata } from "next";
import { Amiri, Cairo } from "next/font/google";
import "./globals.css";

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "القيادة الإدارية ودورها في تحسين أداء الموظفين | مزوار وفاء",
  description: "مذكرة نهاية التكوين - تسيير الموارد البشرية - المعهد الوطني المتخصص في التكوين المهني الشهيد كرار مولود بئر خادم",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${amiri.variable} ${cairo.variable}`}>
      <body style={{ fontFamily: "var(--font-cairo), sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
