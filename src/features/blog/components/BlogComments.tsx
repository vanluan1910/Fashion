import React from "react";
import Image from "next/image";

export function BlogComments() {
  const comments = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      date: "25 Tháng 3, 2024",
      avatar: "https://secure.gravatar.com/avatar/22e032470e9a7e6e580e0cd22c3e16ee?s=80&d=mm&r=g",
      content: "Bài viết rất hữu ích! Tôi đã áp dụng các mẹo phối đồ này và cảm thấy tự tin hơn rất nhiều. Cảm ơn tác giả.",
      replies: [
        {
          id: 2,
          name: "Quản trị viên",
          date: "26 Tháng 3, 2024",
          avatar: "https://secure.gravatar.com/avatar/789?s=80&d=mm&r=g",
          content: "Chào bạn, rất vui vì bài viết giúp ích được cho bạn. Chúc bạn luôn rạng rỡ!",
        }
      ]
    },
    {
      id: 3,
      name: "Trần Thị B",
      date: "24 Tháng 3, 2024",
      avatar: "https://secure.gravatar.com/avatar/456?s=80&d=mm&r=g",
      content: "Mình rất thích phong cách tối giản này. Bạn có thể gợi ý thêm một số địa chỉ mua đồ uy tín không?",
    }
  ];

  return (
    <div className="blog_comments_area mt-[80px]">
      <h3 
        className="text-[28px] font-normal text-[#333] mb-[45px] uppercase tracking-wider"
        style={{ fontFamily: "var(--font-playfair), serif" }}
      >
        03 Bình luận
      </h3>
      
      <div className="comment_list space-y-12">
        {comments.map((comment) => (
          <div key={comment.id} className="comment_item pb-10 border-b last:border-0 border-[#f0f0f0]">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-[80px] h-[80px] shrink-0 rounded-full overflow-hidden border border-[#eee]">
                <Image src={comment.avatar} alt={comment.name} width={80} height={80} className="w-full h-full object-cover" />
              </div>
              <div className="comment_content flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h5 
                    className="text-[18px] font-normal text-[#333] uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {comment.name}
                  </h5>
                  <button type="button" suppressHydrationWarning className="text-[#f74f2e] text-[13px] font-bold uppercase hover:text-[#333] transition-colors font-sans tracking-widest border-b-2 border-transparent hover:border-[#f74f2e]">Phản hồi</button>
                </div>
                <p className="text-[13px] text-[#999] mb-4 uppercase tracking-[2px]">{comment.date}</p>
                <p className="text-[16px] text-[#666] leading-relaxed font-sans">{comment.content}</p>
              </div>
            </div>

            {comment.replies && (
              <div className="replies mt-10 ml-0 md:ml-[110px] space-y-10">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex flex-col md:flex-row gap-8">
                    <div className="w-[80px] h-[80px] shrink-0 rounded-full overflow-hidden border border-[#eee]">
                      <Image src={reply.avatar} alt={reply.name} width={80} height={80} className="w-full h-full object-cover" />
                    </div>
                    <div className="comment_content flex-1 p-8 bg-[#fdfdfd] border border-[#f0f0f0] rounded-sm">
                      <div className="flex items-center justify-between mb-2">
                        <h5 
                          className="text-[18px] font-normal text-[#333] uppercase tracking-wide"
                          style={{ fontFamily: "var(--font-playfair), serif" }}
                        >
                          {reply.name} <span className="text-[#f74f2e] text-[12px] font-bold ml-2 uppercase tracking-tighter">(Quản trị viên)</span>
                        </h5>
                        <button type="button" suppressHydrationWarning className="text-[#f74f2e] text-[13px] font-bold uppercase hover:text-[#333] transition-colors font-sans tracking-widest">Phản hồi</button>
                      </div>
                      <p className="text-[13px] text-[#999] mb-4 uppercase tracking-[2px]">{reply.date}</p>
                      <p className="text-[16px] text-[#666] leading-relaxed font-sans">{reply.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="comment_form_area mt-[100px] border-t-4 border-[#333] pt-[60px]">
        <h3 
          className="text-[32px] font-normal text-[#333] mb-[15px] uppercase tracking-widest"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Để lại bình luận
        </h3>
        <p className="text-[15px] text-[#888] mb-[45px] font-sans">Email của bạn sẽ không được hiển thị công khai. Các trường bắt buộc được đánh dấu *</p>
        
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="col-span-2">
            <textarea
              suppressHydrationWarning
              placeholder="Lời nhắn của bạn *"
              rows={6}
              className="w-full px-5 py-4 border border-[#eee] focus:outline-none focus:border-[#f74f2e] transition-all font-sans resize-none placeholder:uppercase placeholder:text-[12px] placeholder:tracking-widest"
            ></textarea>
          </div>
          <div>
            <input
              suppressHydrationWarning
              type="text"
              placeholder="Họ và tên *"
              className="w-full h-[55px] px-5 border border-[#eee] focus:outline-none focus:border-[#f74f2e] transition-all font-sans placeholder:uppercase placeholder:text-[12px] placeholder:tracking-widest"
            />
          </div>
          <div>
            <input
              suppressHydrationWarning
              type="email"
              placeholder="Email *"
              className="w-full h-[55px] px-5 border border-[#eee] focus:outline-none focus:border-[#f74f2e] transition-all font-sans placeholder:uppercase placeholder:text-[12px] placeholder:tracking-widest"
            />
          </div>
          <div className="col-span-2">
            <button type="submit" suppressHydrationWarning className="px-12 h-[55px] bg-[#333] text-white font-bold uppercase text-[12px] tracking-[4px] hover:bg-[#f74f2e] transition-all font-sans">
              Gửi bình luận
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
