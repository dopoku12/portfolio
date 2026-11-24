import { marked } from 'marked'

export default function ResumeMarkdown({
  content,
  className,
}: {
  content: string
  className: string
}) {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: marked(content) }}
    />
  )
}
