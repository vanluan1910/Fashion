import React, { useEffect } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { $getRoot } from 'lexical';

import { 
  HEADING,
  QUOTE,
  UNORDERED_LIST,
  ORDERED_LIST,
  BOLD_ITALIC_STAR,
  BOLD_ITALIC_UNDERSCORE,
  BOLD_STAR,
  BOLD_UNDERSCORE,
  ITALIC_STAR,
  ITALIC_UNDERSCORE
} from '@lexical/markdown';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ImageNode } from './ImageNode';
import { YouTubeNode } from './YouTubeNode';

import ToolbarPlugin from './ToolbarPlugin';
import ImagesPlugin from './ImagesPlugin';
import YouTubePlugin from './YouTubePlugin';
import theme from './theme';

const ATELIER_TRANSFORMERS = [
  HEADING,
  QUOTE,
  UNORDERED_LIST,
  ORDERED_LIST,
  BOLD_ITALIC_STAR,
  BOLD_ITALIC_UNDERSCORE,
  BOLD_STAR,
  BOLD_UNDERSCORE,
  ITALIC_STAR,
  ITALIC_UNDERSCORE
];

interface EditorProps {
  initialValue?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
}

// Plugin to load initial HTML content
function InitialValuePlugin({ initialValue }: { initialValue?: string }) {
  const [editor] = useLexicalComposerContext();
  
  useEffect(() => {
    if (initialValue && initialValue !== '') {
      editor.update(() => {
        const root = $getRoot();
        const currentContent = root.getTextContent();
        if (currentContent === '') {
          const parser = new DOMParser();
          const dom = parser.parseFromString(initialValue, 'text/html');
          const nodes = $generateNodesFromDOM(editor, dom.body);
          root.clear();
          root.append(...nodes);
        }
      });
    }
  }, [editor, initialValue]);

  return null;
}

// Custom OnChange specifically for HTML
function MyOnChangePlugin({ onChange }: { onChange?: (html: string) => void }) {
  const [editor] = useLexicalComposerContext();
  
  return (
    <OnChangePlugin 
      onChange={() => {
        editor.read(() => {
          const html = $generateHtmlFromNodes(editor);
          if (onChange) {
            onChange(html);
          }
        });
      }} 
    />
  );
}

export default function EditorContent({ initialValue, onChange, placeholder }: EditorProps) {
  const initialConfig = {
    namespace: 'AtelierEditorContent',
    theme,
    nodes: [
      HeadingNode,
      QuoteNode,
      ListItemNode,
      ListNode,
      AutoLinkNode,
      LinkNode,
      ImageNode,
      YouTubeNode,
    ],
    onError: (error: Error) => {
      console.error('Lexical Error:', error);
    },
  };

  return (
    <div className="relative border border-[#eee] rounded-2xl bg-white overflow-hidden focus-within:ring-2 focus-within:ring-[#f74f2e]/10 transition-all shadow-sm">
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <div className="relative min-h-[300px] p-6 text-[14px] font-medium text-[#333] font-sans">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="outline-none min-h-[300px] focus:outline-none leading-relaxed text-[#333]" />
            }
            placeholder={
              <div className="absolute top-6 left-6 text-[#aaa] pointer-events-none text-[14px] font-medium select-none italic">
                {placeholder || 'Bắt đầu viết nội dung mô tả sản phẩm tại đây...'}
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <ImagesPlugin />
          <YouTubePlugin />
          <MarkdownShortcutPlugin transformers={ATELIER_TRANSFORMERS} />
          <InitialValuePlugin initialValue={initialValue} />
          <MyOnChangePlugin onChange={onChange} />
        </div>
      </LexicalComposer>
    </div>
  );
}
