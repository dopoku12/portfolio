import * as React from 'react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '#/components/ui/collapsible.tsx'
import { CaretRightIcon } from '@phosphor-icons/react'
import { cn } from '#/lib/utils'

function Timeline({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="timeline"
      className={cn(
        'flex w-full min-w-0 flex-col gap-2 *:has-[>[data-slot=timeline-item]]:flex *:has-[>[data-slot=timeline-item]]:w-fit *:has-[>[data-slot=timeline-item]]:max-w-full *:has-[>[data-slot=timeline-item]]:min-w-0 *:has-[>[data-slot=timeline-item]]:rounded-md *:has-[>[data-slot=timeline-item]]:text-left *:has-[>[data-slot=timeline-item]]:outline-none *:has-[>[data-slot=timeline-item]]:focus-visible:ring-3 *:has-[>[data-slot=timeline-item]]:focus-visible:ring-ring/50',
        className,
      )}
      {...props}
    />
  )
}

function TimelineItem({
  className,
  status,
  ...props
}: React.ComponentProps<'span'> & {
  status?: 'running' | 'error' | 'pending'
}) {
  return (
    <span
      data-slot="timeline-item"
      data-status={status}
      className={cn(
        'flex w-fit max-w-full min-w-0 items-center gap-2 text-sm text-muted-foreground transition-colors in-[a,button]:cursor-pointer in-[a:hover,button:hover]:text-foreground data-[status=error]:text-destructive data-[status=error]:in-[a:hover,button:hover]:text-destructive data-[status=pending]:opacity-60 data-[status=running]:*:data-[slot=timeline-title]:shimmer',
        className,
      )}
      {...props}
    />
  )
}

function TimelineIcon({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="timeline-icon"
      aria-hidden="true"
      className={cn(
        "flex size-4 shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [[data-slot=timeline-title]~&]:-ml-1",
        className,
      )}
      {...props}
    />
  )
}

function TimelineTitle({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="timeline-title"
      className={cn('min-w-0 truncate motion-reduce:shimmer-none', className)}
      {...props}
    />
  )
}

function TimelineDescription({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="timeline-description"
      className={cn(
        'shrink-0 text-muted-foreground/70 tabular-nums',
        className,
      )}
      {...props}
    />
  )
}

function TimelineCollapsible({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Collapsible>, 'asChild' | 'open'> &
  (
    | { open?: undefined }
    | {
        open: boolean
        onOpenChange: NonNullable<
          React.ComponentProps<typeof Collapsible>['onOpenChange']
        >
      }
  )) {
  return (
    <Collapsible
      data-slot="timeline-collapsible"
      className={cn('flex w-full min-w-0 flex-col', className)}
      {...props}
    />
  )
}

function TimelineTrigger({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof CollapsibleTrigger>, 'asChild'>) {
  return (
    <CollapsibleTrigger
      data-slot="timeline-trigger"
      className={cn(
        'group/timeline-trigger flex w-fit max-w-full min-w-0 cursor-pointer items-center gap-1 rounded-md text-left text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 has-[[data-status=error]]:text-destructive',
        className,
      )}
      {...props}
    >
      {children}
      <TimelineIcon className="transition-transform group-aria-expanded/timeline-trigger:rotate-90">
        <CaretRightIcon strokeWidth={2} />
      </TimelineIcon>
    </CollapsibleTrigger>
  )
}

function TimelineContent({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof CollapsibleContent>, 'asChild'>) {
  return (
    <CollapsibleContent
      data-slot="timeline-content"
      className="min-w-0 overflow-hidden duration-200 [--radix-accordion-content-height:var(--radix-collapsible-content-height)] data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        data-slot="timeline-content-inner"
        className={cn(
          'mt-2 mb-1 ml-[calc(--spacing(2)-1px)] min-w-0 border-l pr-1 pl-4 leading-relaxed wrap-break-word text-muted-foreground',
          className,
        )}
      >
        {children}
      </div>
    </CollapsibleContent>
  )
}

export {
  Timeline,
  TimelineItem,
  TimelineIcon,
  TimelineTitle,
  TimelineDescription,
  TimelineCollapsible,
  TimelineTrigger,
  TimelineContent,
}
