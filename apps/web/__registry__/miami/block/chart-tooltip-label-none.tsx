'use client'

import { Bar, BarChart, XAxis } from 'recharts'

import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '~/registry/miami/ui/card'
import type {
   ChartConfig,
} from '~/registry/miami/ui/chart'
import {
   ChartContainer,
   ChartTooltip,
   ChartTooltipContent,
} from '~/registry/miami/ui/chart'

export const description = 'A stacked bar chart with a legend'

const chartData = [
   { date: '2024-07-15', running: 450, swimming: 300 },
   { date: '2024-07-16', running: 380, swimming: 420 },
   { date: '2024-07-17', running: 520, swimming: 120 },
   { date: '2024-07-18', running: 140, swimming: 550 },
   { date: '2024-07-19', running: 600, swimming: 350 },
   { date: '2024-07-20', running: 480, swimming: 400 },
]

const chartConfig = {
   running: {
      label: 'Running',
      color: 'hsl(var(--chart-1))',
   },
   swimming: {
      label: 'Swimming',
      color: 'hsl(var(--chart-2))',
   },
} satisfies ChartConfig

export default function Component() {
   return (
      <Card>
         <CardHeader>
            <CardTitle>Tooltip - No Label</CardTitle>
            <CardDescription>Tooltip with no label.</CardDescription>
         </CardHeader>
         <CardContent>
            <ChartContainer config={chartConfig}>
               <BarChart accessibilityLayer data={chartData}>
                  <XAxis
                     dataKey="date"
                     tickLine={false}
                     tickMargin={10}
                     axisLine={false}
                     tickFormatter={(value) => {
                        return new Date(value).toLocaleDateString('en-US', {
                           weekday: 'short',
                        })
                     }}
                  />
                  <Bar
                     dataKey="running"
                     stackId="a"
                     fill="var(--color-running)"
                     radius={[0, 0, 4, 4]}
                  />
                  <Bar
                     dataKey="swimming"
                     stackId="a"
                     fill="var(--color-swimming)"
                     radius={[4, 4, 0, 0]}
                  />
                  <ChartTooltip
                     content={<ChartTooltipContent hideIndicator hideLabel />}
                     cursor={false}
                     defaultIndex={1}
                  />
               </BarChart>
            </ChartContainer>
         </CardContent>
      </Card>
   )
}