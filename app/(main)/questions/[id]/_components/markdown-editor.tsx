'use client';
import dynamic from 'next/dynamic';
const MDEditorMarkdown = dynamic(
  () => import('@uiw/react-md-editor').then(mod => mod.default.Markdown),
  {
    ssr: false,
    loading: () => (
      <div className="bg-muted flex h-44 items-center justify-center rounded-md border">
        <p className="text-muted-foreground">Loading preview...</p>
      </div>
    ),
  },
);

const MarkDownEditor = ({ value }: { value: string }) => {
  return <MDEditorMarkdown source={value} style={{ whiteSpace: 'pre-wrap' }} />;
};

export default MarkDownEditor;
