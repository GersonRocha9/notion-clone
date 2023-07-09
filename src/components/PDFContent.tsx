import { Document, Page } from '@react-pdf/renderer'

import ReactDOMServer from 'react-dom/server'
import { Html } from 'react-pdf-html'

interface PDFContentProps {
  contentText: string
}

const element = (contentText: string) => (
  <html>
    <body>{contentText}</body>
  </html>
)

export function PDFContent({ contentText }: PDFContentProps) {
  const html = ReactDOMServer.renderToStaticMarkup(element(contentText))

  return (
    <Document>
      <Page size="A4">
        <Html>{html}</Html>
      </Page>
    </Document>
  )
}
