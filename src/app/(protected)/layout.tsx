import "../globals.css";
import { GlobalContextProvider } from "../../components/contexts/user-global-context";
import { Roboto, Fredoka } from "next/font/google";

const roboto = Roboto({
  weight: ["300","400","500","700","900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const fredoka = Fredoka({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-fredoka",
});


export default function RootLayout({children,}: {children: React.ReactNode}) {
  
  return (
    <html lang="en" className={`${roboto.variable} ${fredoka.variable} h-full bg-chocolate-500`} suppressHydrationWarning>
      <head>
      </head>
      <body className="h-full">
        <GlobalContextProvider>
          {children}
        </GlobalContextProvider>
      </body>
    </html>
  )
}
