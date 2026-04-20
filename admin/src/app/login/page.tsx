"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  ShieldCheck,
  Check
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const isAuth = localStorage.getItem("atelier_admin_auth");
    if (isAuth === "true") {
      router.push("/");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      if (email === "admin@atelier.vn" && password === "admin123") {
        localStorage.setItem("atelier_admin_auth", "true");
        localStorage.setItem("atelier_admin_user", JSON.stringify({
          name: "Quản trị viên",
          role: "Administrator",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
        }));
        router.push("/");
      } else {
        setError("Email hoặc mật khẩu không chính xác.");
        setIsLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#fcfcff] font-sans overflow-hidden relative">
      {/* Dynamic Background Accents */}
      <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] bg-[#f74f2e]/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-[#111c43]/5 rounded-full blur-[120px]" />

      <div className="w-full max-w-[850px] grid grid-cols-1 md:grid-cols-2 bg-white rounded-[32px] shadow-2xl overflow-hidden m-6 border border-gray-100 z-10 animate-in zoom-in-95 duration-500">
        
        {/* Left Side: Branding (Compact version) */}
        <div className="relative hidden md:flex flex-col justify-between p-10 bg-[#111c43] text-white">
           <div className="relative z-10">
              <div className="flex items-center gap-2.5 mb-6">
                 <div className="w-10 h-10 bg-[#f74f2e] rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-[#f74f2e]/20">A</div>
                 <h1 className="text-lg font-black tracking-tighter uppercase whitespace-nowrap">Atelier Admin</h1>
              </div>
              <h2 className="text-2xl font-black leading-tight tracking-tighter mb-4 italic">Kiến tạo<br/><span className="text-[#f74f2e]">Đẳng cấp thời trang.</span></h2>
              <p className="text-white/40 text-[13px] font-bold max-w-[200px] leading-relaxed">Chào mừng trở lại trung tâm điều hành của Atelier.</p>
           </div>

           <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2 py-2 px-4 bg-white/5 rounded-xl border border-white/5 w-fit backdrop-blur-md">
                 <ShieldCheck className="text-[#f74f2e]" size={18} />
                 <span className="text-[11px] font-black uppercase tracking-wider">Bảo mật Secure</span>
              </div>
              <div className="text-[10px] text-white/20 font-bold uppercase tracking-widest whitespace-nowrap">© 2024 Atelier Global.</div>
           </div>

           {/* Elegant Background Texture */}
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
           <div className="absolute bottom-[-20%] left-[-20%] w-full h-full bg-[#f74f2e]/10 rounded-full blur-[80px]" />
        </div>

        {/* Right Side: Compact Login Form */}
        <div className="p-10 lg:p-14 flex flex-col justify-center bg-white">
           <div className="w-full">
              <div className="mb-10">
                 <h3 className="text-2xl font-black text-[#1a1a1a] tracking-tight mb-1">Đăng nhập</h3>
                 <p className="text-gray-400 font-bold text-[13px]">Truy cập hệ thống nhanh chóng.</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-[12px] font-bold animate-in fade-in slide-in-from-top-1">
                   {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                 <div className="space-y-2">
                    <label className="text-[11px] font-black text-[#1a1a1a] uppercase tracking-widest pl-1">Email</label>
                    <div className="relative group">
                       <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="admin@atelier.vn"
                          className="w-full h-12 pl-12 pr-6 bg-gray-50 border-2 border-transparent rounded-xl text-[14px] font-black text-[#1a1a1a] focus:bg-white focus:border-[#f74f2e] focus:ring-4 focus:ring-[#f74f2e]/10 outline-none transition-all"
                       />
                       <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#f74f2e] transition-colors" />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <div className="flex items-center justify-between pl-1">
                       <label className="text-[11px] font-black text-[#1a1a1a] uppercase tracking-widest">Mật khẩu</label>
                    </div>
                    <div className="relative group">
                       <input 
                          type={showPassword ? "text" : "password"} 
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full h-12 pl-12 pr-12 bg-gray-50 border-2 border-transparent rounded-xl text-[14px] font-black text-[#1a1a1a] focus:bg-white focus:border-[#f74f2e] focus:ring-4 focus:ring-[#f74f2e]/10 outline-none transition-all"
                       />
                       <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#f74f2e] transition-colors" />
                       <button 
                          type="button" 
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                       </button>
                    </div>
                 </div>

                 <label className="flex items-center gap-2.5 cursor-pointer group w-fit">
                    <div className="relative w-4 h-4 flex items-center justify-center">
                       <input type="checkbox" className="peer absolute w-full h-full opacity-0 cursor-pointer" />
                       <div className="w-4 h-4 border-2 border-gray-200 rounded-md bg-gray-50 peer-checked:bg-[#f74f2e] peer-checked:border-[#f74f2e] transition-all" />
                       <Check size={10} className="absolute text-white scale-0 peer-checked:scale-100 transition-transform" />
                    </div>
                    <span className="text-[12px] font-bold text-gray-400 group-hover:text-gray-600 transition-colors">Ghi nhớ tôi</span>
                 </label>

                 <button 
                    disabled={isLoading}
                    className="w-full h-12 bg-[#1a1a1a] text-white rounded-xl text-[13px] font-black uppercase tracking-[1px] flex items-center justify-center gap-3 hover:bg-[#111c43] transition-all shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none mt-4 font-sans"
                 >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Vào Dashboard <ArrowRight size={18} /></>
                    )}
                 </button>
              </form>

              <p className="mt-10 text-center text-gray-300 text-[11px] font-bold italic tracking-wide">
                 Hỗ trợ cấp lại tài khoản? <span className="text-[#f74f2e] cursor-pointer hover:underline">Click tại đây</span>
              </p>
           </div>
        </div>

      </div>
    </div>
  );
}
