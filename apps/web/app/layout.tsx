import type { Metadata } from 'next'
import { ViewTransitions } from 'next-view-transitions'
import { ThemeProvider } from '~/components/theme-provider'
import { Toaster } from '~/components/ui/sonner'
import { TooltipProvider } from '~/components/ui/tooltip'
import { fontSans } from '~/lib/fonts'
import { absoluteUrl, constructMetadata, ny } from '~/lib/utils'
import { Toaster as DefaultToaster } from '~/registry/default/ui/toaster'
import { Toaster as NewYorkSonner } from '~/registry/miami/ui/sonner'
import { Toaster as NewYorkToaster } from '~/registry/miami/ui/toaster'
import { TailwindIndicator } from '~/components/tailwind-indicator'
import { ThemeSwitcher } from '~/components/theme-switcher'
import '~/styles/globals.css'
import '~/styles/mdx.css'

export const metadata: Metadata = constructMetadata({
   title: 'Universe UI',
   description:
    'Universe UI is a collection of open-source components built using Radix UI and Tailwind CSS. It is designed to help developers quickly build beautiful and responsive websites.',
   image: absoluteUrl('/api/og'),
})

export default function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <ViewTransitions>
         <html lang="en" suppressHydrationWarning>
            <head />
            <body
               className={ny(
                  'bg-background relative flex min-h-screen w-full flex-col justify-center overflow-x-hidden scroll-smooth font-sans antialiased',
                  fontSans.variable,
               )}
            >
               <ThemeProvider attribute="class" defaultTheme="dark">
                  <TooltipProvider>
                     {children}
                     <Toaster />
                  </TooltipProvider>
                  <TailwindIndicator />
                  <ThemeSwitcher />
                  <NewYorkToaster />
                  <DefaultToaster />
                  <NewYorkSonner />
               </ThemeProvider>
            </body>
         </html>
      </ViewTransitions>
   )
}
