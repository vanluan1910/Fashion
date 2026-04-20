import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import { $getNodeByKey, LexicalNode, NodeKey } from 'lexical';
import { Maximize } from 'lucide-react';

interface ImageComponentProps {
  src: string;
  altText: string;
  width?: number;
  height?: number;
  nodeKey: NodeKey;
}

type ResizableImageNode = LexicalNode & {
  setWidthAndHeight: (width?: number, height?: number) => void;
};

const MIN_WIDTH = 120;
const MAX_WIDTH = 1800;

export default function ImageComponent({
  src,
  altText,
  width,
  height,
  nodeKey,
}: ImageComponentProps) {
  const [editor] = useLexicalComposerContext();
  const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(nodeKey);
  const [widthInput, setWidthInput] = useState(width ? String(width) : '');
  const imageRef = useRef<HTMLImageElement | null>(null);
  const dragStateRef = useRef<{ startX: number; startWidth: number } | null>(null);

  useEffect(() => {
    setWidthInput(width ? String(width) : '');
  }, [width]);

  const updateImageSize = useCallback(
    (nextWidth?: number, nextHeight?: number) => {
      editor.update(() => {
        const node = $getNodeByKey(nodeKey) as ResizableImageNode | null;
        if (!node || node.getType() !== 'image') {
          return;
        }
        node.setWidthAndHeight(nextWidth, nextHeight);
      });
    },
    [editor, nodeKey],
  );

  const stopResize = useCallback(() => {
    dragStateRef.current = null;
    window.removeEventListener('mousemove', onDragResize);
    window.removeEventListener('mouseup', stopResize);
  }, []);

  const onDragResize = useCallback(
    (event: MouseEvent) => {
      const dragState = dragStateRef.current;
      if (!dragState) {
        return;
      }

      const deltaX = event.clientX - dragState.startX;
      const nextWidth = Math.round(
        Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, dragState.startWidth + deltaX)),
      );

      setWidthInput(String(nextWidth));
      updateImageSize(nextWidth, undefined);
    },
    [updateImageSize],
  );

  const startResize = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const currentWidth =
      width ??
      Math.round(imageRef.current?.getBoundingClientRect().width ?? MIN_WIDTH);

    dragStateRef.current = {
      startX: event.clientX,
      startWidth: Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, currentWidth)),
    };

    window.addEventListener('mousemove', onDragResize);
    window.addEventListener('mouseup', stopResize);
  };

  useEffect(() => {
    return () => {
      stopResize();
    };
  }, [stopResize]);

  return (
    <figure 
      className={`my-4 relative inline-block max-w-full transition-all duration-300 ${isSelected ? 'ring-4 ring-[#f74f2e]/20 rounded-xl' : ''}`}
      draggable={false}
      onMouseDown={(e) => {
        if (e.button === 0) {
          e.preventDefault();
          e.stopPropagation();
          setTimeout(() => {
            setSelected(!isSelected);
          }, 0);
        }
      }}
    >
      <img
        ref={imageRef}
        src={src}
        alt={altText}
        draggable={false}
        style={{
          width: width ?? undefined,
          height: height ?? undefined,
          maxWidth: '100%',
          display: 'block',
          borderRadius: '8px',
          border: isSelected ? '3px solid #f74f2e' : '3px solid transparent',
          boxShadow: isSelected ? '0 10px 25px rgba(132, 90, 223, 0.4)' : 'none',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      />

      {isSelected && (
        <button
          type="button"
          onMouseDown={startResize}
          className="absolute bottom-0 right-0 h-8 w-8 rounded-tl-xl bg-[#f74f2e] text-white flex items-center justify-center shadow-lg cursor-se-resize z-10"
          title="Kéo để đổi kích thước ảnh"
        >
          <Maximize size={16} />
        </button>
      )}
    </figure>
  );
}
