import 'highlight.js/styles/atom-one-dark.css'

import { Document, PDFDownloadLink, Page } from '@react-pdf/renderer'
import {
  BubbleMenu,
  EditorContent,
  FloatingMenu,
  useEditor,
} from '@tiptap/react'
import {
  RxChatBubble,
  RxChevronDown,
  RxCode,
  RxFile,
  RxFontBold,
  RxFontItalic,
  RxHeading,
  RxListBullet,
  RxStrikethrough,
} from 'react-icons/rx'

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import StarterKit from '@tiptap/starter-kit'
import js from 'highlight.js/lib/languages/javascript'
import { lowlight } from 'lowlight'
import { useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import { Html } from 'react-pdf-html'
import { BubbleButton } from './BubbleButton'
import { initialContent } from './initialContent'

lowlight.registerLanguage('js', js)

export default function Editor() {
  const [contentText, setContentText] = useState('')
  const today = new Date()

  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    onUpdate: ({ editor }) => {
      setContentText(editor.getHTML())

      localStorage.setItem('content', editor.getHTML())
    },
    content: localStorage.getItem('content') || initialContent,
    editorProps: {
      attributes: {
        class: 'outline-none',
      },
    },
  })

  if (!editor) {
    return null
  }

  const element = (contentText: string) => (
    <html>
      <body>{contentText}</body>
    </html>
  )

  const html = ReactDOMServer.renderToStaticMarkup(element(contentText))

  return (
    <>
      <PDFDownloadLink
        document={
          <Document>
            <Page size="A4">
              <Html>{html}</Html>
            </Page>
          </Document>
        }
        fileName={`documento-${today.getDate()}-${today.getMonth()}-${today.getFullYear()}.pdf`}
        className="flex items-center justify-center w-full py-2 text-center text-white bg-red-500 hover:bg-red-400 gap-2 transition-colors duration-200 rounded-lg"
      >
        <RxFile className="w-6 h-6" /> Exportar PDF
      </PDFDownloadLink>

      <EditorContent
        editor={editor}
        className="max-w-[700px] mx-auto pt-16 prose prose-invert prose-violet"
      />

      <BubbleMenu
        editor={editor}
        className="bg-zinc-700 border border-zinc-600 shadow-xl shadow-black/20 rounded-lg overflow-hidden flex divide-x divide-zinc-600"
      >
        <BubbleButton
          icon={<RxChatBubble className="w-4 h-4" />}
          // onClick={() => editor.chain().focus().toggleBold().run()}
          text="Comentar"
        />

        <BubbleButton
          icon={<RxChevronDown className="w-4 h-4" />}
          // onClick={() => editor.chain().focus().toggleBold().run()}
          text="Text"
        />

        <div className="flex items-center">
          <BubbleButton
            icon={<RxFontBold className="w-4 h-4" />}
            onClick={() => editor.chain().focus().toggleBold().run()}
            data-active={editor.isActive('bold')}
          />

          <BubbleButton
            icon={<RxFontItalic className="w-4 h-4" />}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            data-active={editor.isActive('italic')}
          />

          <BubbleButton
            icon={<RxStrikethrough className="w-4 h-4" />}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            data-active={editor.isActive('strike')}
          />

          <BubbleButton
            icon={<RxCode className="w-4 h-4" />}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            data-active={editor.isActive('codeBlock')}
          />
        </div>
      </BubbleMenu>

      <FloatingMenu
        editor={editor}
        shouldShow={({ state }) => {
          const { $from } = state.selection

          const currentLineText = $from.nodeBefore?.textContent

          return currentLineText === '/'
        }}
        className="bg-zinc-700 border border-zinc-600 shadow-xl shadow-black/20 rounded-lg overflow-hidden flex flex-col divide-x divide-zinc-600"
      >
        <BubbleButton
          icon={<RxHeading className="w-4 h-4" />}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          data-active={editor.isActive('heading', { level: 1 })}
          text="Título"
        />

        <BubbleButton
          icon={<RxListBullet className="w-4 h-4" />}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          data-active={editor.isActive('bulletList')}
          text="Lista"
        />
      </FloatingMenu>
    </>
  )
}
