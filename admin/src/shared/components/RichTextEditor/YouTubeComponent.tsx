import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { NodeKey, $getNodeByKey } from 'lexical';
import { Trash2 } from 'lucide-react';

interface YouTubeComponentProps {
  videoID: string;
  format: 'standard' | 'wide';
  nodeKey: NodeKey;
}

export default function YouTubeComponent({ videoID, format, nodeKey }: YouTubeComponentProps) {
  const [editor] = useLexicalComposerContext();

  const handleRemove = () => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if (node) {
        node.remove();
      }
    });
  };

  return (
    <div className="relative my-6 group animate-in fade-in zoom-in duration-300">
      <div className={`relative rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-video ${format === 'wide' ? 'w-full' : 'max-w-2xl mx-auto'}`}>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoID}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-transparent cursor-default" />
      </div>
      
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleRemove}
          className="bg-[#f74f2e] text-white p-2.5 rounded-full hover:bg-red-600 transition-all shadow-lg active:scale-95"
          title="Xóa video này"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
