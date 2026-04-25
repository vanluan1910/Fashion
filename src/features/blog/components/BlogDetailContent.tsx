import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "../types/blog-types";
import { 
  FaFacebookF, 
  FaPinterestP, 
  FaTwitter, 
  FaYoutube, 
  FaRegCalendarAlt, 
  FaUserEdit
} from "react-icons/fa";

interface BlogDetailContentProps {
  post: BlogPost;
}

export function BlogDetailContent({ post }: BlogDetailContentProps) {
  return (
    <div className="blog_details_inner">
      <div className="blog_main_image mb-[40px] overflow-hidden rounded-sm">
        <Image
          src={post.image}
          alt={post.title}
          width={870}
          height={550}
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="blog_details">
        <div className="blog_meta flex flex-wrap items-center gap-[20px] mb-[25px] text-[#999] text-[13px] uppercase font-sans tracking-widest">
          <span className="flex items-center gap-1.5 hover:text-[#f74f2e] transition-colors cursor-default">
            <FaRegCalendarAlt className="text-[#f74f2e]" /> {post.date}
          </span>
          <span className="flex items-center gap-1.5 hover:text-[#f74f2e] transition-colors cursor-default">
            <FaUserEdit className="text-[#f74f2e]" /> {post.author}
          </span>
        </div>

        <h2 className="text-[28px] md:text-[34px] font-normal text-[#333] mb-[25px] leading-[1.3] font-sans capitalize tracking-tight">
          {post.title}
        </h2>
        
        <div className="blog_content_text text-[#666] text-[16px] leading-[1.8] mb-[50px] font-sans">
          <div 
            className="prose prose-lg max-w-none hover:prose-a:text-[#f74f2e] transition-colors prose-p:mb-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        <div className="blog_footer border-y border-[#f2f2f2] py-[25px] mb-[60px] flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="blog_tags flex items-center gap-3">
            <span className="text-[#333] font-bold uppercase text-[12px] tracking-[2px] font-sans">Thẻ:</span>
            <div className="flex flex-wrap gap-2 font-sans">
              {["Thời trang", "Lối sống", "Xu hướng"].map((tag) => (
                <Link 
                  key={tag} 
                  href="#" 
                  className="text-[#999] text-[12px] hover:text-[#f74f2e] transition-colors uppercase"
                >
                  {tag},
                </Link>
              ))}
            </div>
          </div>

          <div className="blog_social flex items-center gap-5">
            <span className="text-[#333] font-bold uppercase text-[12px] tracking-[2px] font-sans">Chia sẻ:</span>
            <div className="flex gap-5">
              {[
                { icon: <FaFacebookF /> },
                { icon: <FaTwitter /> },
                { icon: <FaPinterestP /> },
                { icon: <FaYoutube /> }
              ].map((social, idx) => (
                <Link 
                  key={idx} 
                  href="#" 
                  className="text-[#999] hover:text-[#f74f2e] text-[16px] transition-all"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="author_box bg-[#fcfcfc] p-[40px] mb-[30px] flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left border border-[#f5f5f5]">
        <div className="author_avatar w-[100px] h-[100px] shrink-0 rounded-full overflow-hidden border border-[#eee]">
          <Image
            src="https://secure.gravatar.com/avatar/22e032470e9a7e6e580e0cd22c3e16ee?s=100&d=mm&r=g"
            alt={post.author}
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="author_info">
          <h4 className="text-[18px] font-normal text-[#333] mb-[15px] uppercase tracking-widest font-serif">
            {post.author}
          </h4>
          <p className="text-[#888] text-[15px] leading-[1.7] italic font-sans mb-0">
            "Chuyên gia thời trang với hơn 10 năm kinh nghiệm. Đam mê chia sẻ kiến thức về phong cách sống và xu hướng thiết kế mới nhất để giúp bạn tự tin hơn."
          </p>
        </div>
      </div>
    </div>
  );
}
