"use client";

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { 
  FORMAT_TEXT_COMMAND, 
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
} from 'lexical';
import { 
  $createHeadingNode, 
} from '@lexical/rich-text';
import { 
  $setBlocksType,
} from '@lexical/selection';
import { 
  INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list';
import { 
  Undo, 
  Redo, 
  Bold, 
  Italic, 
  Underline, 
  Heading1, 
  Heading2, 
  List, 
  AlignLeft, 
  AlignCenter, 
  Image as ImageIcon,
  Video,
  Upload
} from 'lucide-react';
import { INSERT_IMAGE_COMMAND } from './ImagesPlugin';
import { INSERT_YOUTUBE_COMMAND } from './YouTubePlugin';
import Modal from '@/shared/components/Modal';
import Button from '@/shared/components/Button';
import React, { useState } from 'react';

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  
  const [isYouTubeModalOpen, setIsYouTubeModalOpen] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');

  const formatHeading = (headingSize: 'h1' | 'h2') => {
    editor.update(() => {
      $setBlocksType(null, () => $createHeadingNode(headingSize));
    });
  };

  const formatBulletList = () => {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  };

  return (
    <div className="flex items-center gap-1 p-2 mb-2 border-b border-[#eee] bg-[#fcfcff] overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-0.5 pr-2 border-r border-[#eee]">
        <ToolbarButton icon={<Undo size={18} />} onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)} title="Hoàn tác" />
        <ToolbarButton icon={<Redo size={18} />} onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)} title="Làm lại" />
      </div>

      <div className="flex items-center gap-0.5 px-2 border-r border-[#eee]">
        <ToolbarButton icon={<Bold size={18} />} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')} title="In đậm" />
        <ToolbarButton icon={<Italic size={18} />} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')} title="In nghiêng" />
        <ToolbarButton icon={<Underline size={18} />} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')} title="Gạch chân" />
      </div>

      <div className="flex items-center gap-0.5 px-2 border-r border-[#eee]">
        <ToolbarButton icon={<Heading1 size={18} />} onClick={() => formatHeading('h1')} title="Tiêu đề 1" />
        <ToolbarButton icon={<Heading2 size={18} />} onClick={() => formatHeading('h2')} title="Tiêu đề 2" />
        <ToolbarButton icon={<List size={18} />} onClick={() => formatBulletList()} title="Danh sách" />
      </div>

      <div className="flex items-center gap-0.5 px-2 border-r border-[#eee]">
        <ToolbarButton icon={<AlignLeft size={18} />} onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')} title="Căn trái" />
        <ToolbarButton icon={<AlignCenter size={18} />} onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')} title="Căn giữa" />
      </div>

      <div className="flex items-center gap-0.5 pl-2">
        <ToolbarButton 
          icon={<ImageIcon size={18} />} 
          onClick={() => setIsImageModalOpen(true)} 
          title="Chèn ảnh" 
        />
        <ToolbarButton 
          icon={<Video size={18} />} 
          onClick={() => setIsYouTubeModalOpen(true)} 
          title="Chèn Video YouTube" 
        />
      </div>

      {/* Image Modal */}
      <Modal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        title="Chèn hình ảnh"
      >
        <div className="flex flex-col gap-4 py-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-[#333] uppercase">Đường dẫn hình ảnh (URL)</label>
            <input 
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="bg-white px-4 py-3 rounded-xl border border-[#ddd] text-[13px] text-[#333] font-bold focus:outline-none focus:ring-2 focus:ring-[#845adf]/20 focus:border-[#845adf] transition-all"
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-1.5 pt-2">
            <label className="text-[11px] font-bold text-[#333] uppercase text-center mb-1">Hoặc tải lên từ máy tính</label>
            <div className="flex gap-2">
              <input 
                type="file" 
                id="lexical-image-upload" 
                className="hidden" 
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      // Chuyển sang Base64 để lưu trữ cục bộ
                      setImageUrl(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <label 
                htmlFor="lexical-image-upload"
                className="flex-1 bg-[#845adf]/5 border-2 border-dashed border-[#845adf]/20 rounded-2xl px-4 py-8 text-[13px] font-extrabold text-[#845adf] flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-[#845adf]/10 transition-all border-[#845adf]/30"
              >
                <div className="p-3 bg-white rounded-full shadow-sm text-[#845adf]">
                  <Upload size={24} />
                </div>
                <span>Chọn tệp ảnh từ máy tính</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsImageModalOpen(false)}
              className="!py-2.5 !px-5 !text-[12px] !rounded-lg"
            >
              Hủy
            </Button>
            <Button 
              variant="primary" 
              onClick={() => {
                if (imageUrl) {
                  editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                    src: imageUrl,
                    altText: 'Atelier Image',
                    width: 300
                  });
                  setImageUrl('');
                  setIsImageModalOpen(false);
                }
              }}
              className="!py-2.5 !px-8 !text-[12px] !rounded-lg shadow-lg shadow-[#845adf]/20"
            >
              Chèn vào bài viết
            </Button>
          </div>
        </div>
      </Modal>

      {/* YouTube Modal */}
      <Modal
        isOpen={isYouTubeModalOpen}
        onClose={() => setIsYouTubeModalOpen(false)}
        title="Nhúng Video YouTube"
      >
        <div className="flex flex-col gap-4 py-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-[#333] uppercase">Đường dẫn Video (URL)</label>
            <input 
              type="text"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="bg-white px-4 py-3 rounded-xl border border-[#ddd] text-[13px] text-[#333] font-bold focus:outline-none focus:ring-2 focus:ring-[#845adf]/20 focus:border-[#845adf] transition-all"
              autoFocus
            />
            <p className="text-[11px] text-[#845adf] font-bold mt-1 tracking-tight">Hỗ trợ các liên kết: youtube.com, youtu.be...</p>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsYouTubeModalOpen(false)}
              className="!py-2.5 !px-5 !text-[12px] !rounded-lg"
            >
              Hủy
            </Button>
            <Button 
              variant="danger" 
              onClick={() => {
                if (youtubeUrl) {
                  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                  const match = youtubeUrl.match(regExp);
                  const videoID = (match && match[2].length === 11) ? match[2] : youtubeUrl;
                  
                  editor.dispatchCommand(INSERT_YOUTUBE_COMMAND, videoID);
                  setYoutubeUrl('');
                  setIsYouTubeModalOpen(false);
                }
              }}
              className="!py-2.5 !px-8 !text-[12px] !rounded-lg shadow-lg shadow-red-500/20"
            >
              Nhúng Video
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function ToolbarButton({ icon, onClick, title }: { icon: React.ReactNode; onClick: () => void; title?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="p-2 hover:bg-[#845adf]/10 rounded-xl transition-colors flex items-center justify-center text-[#666] hover:text-[#845adf] group"
    >
      <div className="group-hover:scale-110 transition-transform">{icon}</div>
    </button>
  );
}
