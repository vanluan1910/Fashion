const theme = {
  ltr: 'ltr',
  rtl: 'rtl',
  placeholder: 'editor-placeholder',
  paragraph: 'mb-2 text-[14px] text-[#333] leading-relaxed',
  quote: 'border-l-4 border-[#845adf]/20 pl-4 italic my-4 text-[#666]',
  heading: {
    h1: 'text-2xl font-black text-[#845adf] tracking-tighter mt-6 mb-4',
    h2: 'text-xl font-bold text-[#845adf] tracking-tight mt-5 mb-3',
    h3: 'text-lg font-bold text-[#845adf] mt-4 mb-2',
  },
  list: {
    nested: {
      listitem: 'list-none',
    },
    ol: 'list-decimal ml-6 mb-4 text-[#333]',
    ul: 'list-disc ml-6 mb-4 text-[#333]',
    listitem: 'mb-1',
  },
  text: {
    bold: 'font-bold text-[#333]',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
    code: 'bg-[#f3f4f9] px-1 rounded font-mono text-[13px] text-[#845adf]',
  },
  link: 'text-[#845adf] underline hover:opacity-80 transition-opacity',
};

export default theme;
