import type { Metadata } from 'next'
import Link from 'next/link'

import { ny } from '~/lib/utils'
import { SuperAnnouncement } from '~/components/super-announcement'
import { ExamplesNav } from '~/components/examples-nav'
import {
   PageActions,
   PageHeader,
   PageHeaderDescription,
   PageHeaderHeading,
} from '~/components/page-header'
import { buttonVariants } from '~/registry/miami/ui/button'

export const metadata: Metadata = {
   title: 'Examples',
   description: 'Check out some examples app built using the components.',
}

interface ExamplesLayoutProps {
   children: React.ReactNode
}

export default function ExamplesLayout({ children }: ExamplesLayoutProps) {
   return (
      <div className="container relative">
         <PageHeader>
            <SuperAnnouncement href="/docs/changelog" text="Introducing Lift Mode" />
            <PageHeaderHeading className="hidden md:block">
               Check out some examples
            </PageHeaderHeading>
            <PageHeaderHeading className="md:hidden">Examples</PageHeaderHeading>
            <PageHeaderDescription>
               Dashboard, cards, authentication. Some examples built using the
               components. Use this as a guide to build your own.
            </PageHeaderDescription>
            <PageActions>
               <Link href="/docs" className={ny(buttonVariants(), 'rounded-[6px]')}>
                  Get Started
               </Link>
               <Link
                  href="/components"
                  className={ny(
                     buttonVariants({ variant: 'outline' }),
                     'rounded-[6px]',
                  )}
               >
                  Components
               </Link>
            </PageActions>
         </PageHeader>
         <section>
            <ExamplesNav />
            <div className="bg-background overflow-hidden rounded-lg border shadow">
               {children}
            </div>
         </section>
      </div>
   )
}
