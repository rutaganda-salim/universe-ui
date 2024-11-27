'use client'

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ny } from '~/lib/utils'
import { Button } from '~/registry/miami/ui/button'
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from '~/registry/miami/ui/command'
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '~/registry/miami/ui/form'
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '~/registry/miami/ui/popover'
import { toast } from '~/registry/miami/ui/use-toast'

const languages = [
   { label: 'English', value: 'en' },
   { label: 'French', value: 'fr' },
   { label: 'German', value: 'de' },
   { label: 'Spanish', value: 'es' },
   { label: 'Portuguese', value: 'pt' },
   { label: 'Russian', value: 'ru' },
   { label: 'Japanese', value: 'ja' },
   { label: 'Korean', value: 'ko' },
   { label: 'Chinese', value: 'zh' },
] as const

const FormSchema = z.object({
   language: z.string({
      required_error: 'Please select a language.',
   }),
})

export default function ComboboxForm() {
   const [open, setOpen] = React.useState(false)

   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
   })

   function onSubmit(data: z.infer<typeof FormSchema>) {
      toast({
         title: 'You submitted the following values:',
         description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
               <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
         ),
      })
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
               control={form.control}
               name="language"
               render={({ field }) => (
                  <FormItem className="flex flex-col">
                     <FormLabel>Language</FormLabel>
                     <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                           <FormControl>
                              <Button
                                 variant="outline"
                                 role="combobox"
                                 className={ny(
                                    'w-[200px] justify-between',
                                    !field.value && 'text-muted-foreground',
                                 )}
                              >
                                 {field.value
                                    ? languages.find(
                                       language => language.value === field.value,
                                    )?.label
                                    : 'Select language'}
                                 <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" />
                              </Button>
                           </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                           <Command>
                              <CommandInput
                                 placeholder="Search framework..."
                                 className="h-9"
                              />
                              <CommandEmpty>No framework found.</CommandEmpty>
                              <CommandList>
                                 <CommandGroup>
                                    {languages.map(language => (
                                       <CommandItem
                                          value={language.label}
                                          key={language.value}
                                          onSelect={() => {
                                             form.setValue('language', language.value)
                                             setOpen(false)
                                          }}
                                       >
                                          {language.label}
                                          <CheckIcon
                                             className={ny(
                                                'ml-auto size-4',
                                                language.value === field.value
                                                   ? 'opacity-100'
                                                   : 'opacity-0',
                                             )}
                                          />
                                       </CommandItem>
                                    ))}
                                 </CommandGroup>
                              </CommandList>
                           </Command>
                        </PopoverContent>
                     </Popover>
                     <FormDescription>
                        This is the language that will be used in the dashboard.
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button type="submit">Submit</Button>
         </form>
      </Form>
   )
}