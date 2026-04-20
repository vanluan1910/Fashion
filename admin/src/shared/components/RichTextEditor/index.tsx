

import React, { lazy, Suspense } from 'react';

interface EditorProps {
  initialValue?: string;
  onChange?: (jsonState: string) => void;
  placeholder?: string;
}

const EditorClient = lazy(() => import('./EditorContent'));

const LoadingFallback = () => (
  <div className="h-[250px] w-full bg-surface-container-low/20 border border-outline-variant/10 rounded-2xl animate-pulse flex items-center justify-center">
    <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-20 text-primary">Atelier Editor Loading...</div>
  </div>
);

export default function RichTextEditor(props: EditorProps) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <EditorClient {...props} />
    </Suspense>
  );
}
