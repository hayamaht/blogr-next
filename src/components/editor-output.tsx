'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic'

const Output = dynamic(
  async () => (await import('editorjs-react-renderer')).default,
  { ssr: false }
)

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
}

const style = {
  paragraph: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },
}

interface EditorOutputProps {
  content: any
}

export default function EditorOutput({ content }: EditorOutputProps) {
  return (
    <Output
      style={style}
      className='text-sm'
      renderers={renderers}
      data={content}
    />
  )
}

function CustomCodeRenderer({ data }: any) {
  return (
    <pre className='bg-secondary/90 rounded-md p-4'>
      <code className='text-foreground/90 text-sm font-mono'>{data.code}</code>
    </pre>
  )
}

function CustomImageRenderer({ data }: any) {
  const src = data.file.url

  return (
    <div className='relative w-full min-h-[15rem]'>
      <Image alt='image' className='object-contain' fill src={src} />
    </div>
  )
}