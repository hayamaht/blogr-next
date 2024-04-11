import "@/styles/globals.css";
import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import AuthProvider from "@/components/providers/auth";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";
import Navbar from "@/components/layouts/navbar";

const font = Noto_Sans({ 
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "Blogr Next",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased mt-12",
        font.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Navbar />
            <main className="container max-w-7xl mx-auto h-full pt-12">
              {children}
            </main>
          </AuthProvider>  
        </ThemeProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
