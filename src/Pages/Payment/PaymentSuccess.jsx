import React, { useContext, useEffect, useState } from "react";
import CardAnimation from "../../Components/Animations/CardAnimation";
import { ArrowRight, Check, ShieldCheck, Globe, Zap, Download } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { useAxios } from "../../Hooks/Api/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../../Context/Context";
import Confetti from "react-confetti"; // Install: npm install react-confetti

const PaymentSuccess = () => {
  const { userData, setReload } = useContext(AuthContext);
  const axiosSecure = useAxios();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [showConfetti, setShowConfetti] = useState(true);

  const mutation = useMutation({
    mutationFn: (id) => axiosSecure.get(`/payment-status?session_id=${id}`),
    onSuccess: () => {
      setReload((prev) => !prev);
      setTimeout(() => setShowConfetti(false), 5000); // Stop confetti after 5s
    },
  });

  useEffect(() => {
    if (sessionId) {
      mutation.mutate(sessionId);
    }
  }, [sessionId]);

  if (mutation.isPending) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-sky-100 border-t-sky-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Zap size={20} className="text-sky-500 animate-pulse" />
          </div>
        </div>
        <p className="mt-6 text-slate-400 font-medium tracking-widest text-xs uppercase">Authorizing...</p>
      </div>
    );
  }

  if (mutation.isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
        <div className="max-w-md w-full p-10 bg-white rounded-3xl shadow-xl text-center border border-slate-100">
          <div className="bg-red-50 text-red-500 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3">
            <ShieldCheck size={28} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Session Expired</h2>
          <p className="text-slate-500 mt-2 text-sm leading-relaxed">We couldn't verify your secure payment token. Please check your dashboard.</p>
          <Link to="/" className="mt-8 block py-4 bg-slate-900 text-white rounded-2xl font-bold hover:shadow-lg transition-all">Return to Home</Link>
        </div>
      </div>
    );
  }

  if (!mutation.isSuccess) return null;
  const paymentInfo = mutation.data?.data;

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {showConfetti && <Confetti numberOfPieces={300} recycle={false} colors={['#0ea5e9', '#38bdf8', '#bae6fd']} />}
      
      {/* Soft Background Mesh Gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-sky-100/50 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-[100px]"></div>

      <CardAnimation
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="max-w-[500px] w-full relative group"
      >
        {/* The Card Body */}
        <div className="bg-white/70 backdrop-blur-2xl border border-white rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] overflow-hidden">
          
          {/* Top Status Header */}
          <div className="p-10 pb-0 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gradient-to-tr from-sky-400 to-sky-600 rounded-[28px] flex items-center justify-center shadow-lg shadow-sky-200 mb-6 transform group-hover:rotate-6 transition-transform duration-500">
              <Check className="text-white" size={40} strokeWidth={3} />
            </div>
            <span className="text-sky-600 font-black text-[10px] uppercase tracking-[0.2em] mb-2">Payment Received</span>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Welcome Aboard.</h1>
            <p className="text-slate-500 text-sm max-w-[280px]">Your account has been successfully upgraded to the premium tier.</p>
          </div>

          {/* Details Section */}
          <div className="p-10 space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/50 border border-slate-100 p-5 rounded-3xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Current Plan</p>
                <p className="text-lg font-bold text-slate-800 tracking-tight">{paymentInfo?.packageName}</p>
              </div>
              <div className="bg-white/50 border border-slate-100 p-5 rounded-3xl text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Investment</p>
                <p className="text-lg font-bold text-sky-600 tracking-tight">${paymentInfo?.packageAmount / 100}</p>
              </div>
            </div>

            {/* Visual Separator */}
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-dashed border-slate-200"></div>
              <div className="flex-none mx-4 w-2 h-2 rounded-full bg-slate-200"></div>
              <div className="flex-grow border-t border-dashed border-slate-200"></div>
            </div>

            <div className="space-y-4">
               <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 font-medium">Transaction Reference</span>
                  <span className="text-slate-900 font-mono text-xs bg-slate-100 px-2 py-1 rounded-md">{paymentInfo?.transactionId?.slice(0, 12)}...</span>
               </div>
               <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 font-medium">Account Access</span>
                  <span className="text-emerald-500 font-bold flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                    Active Now
                  </span>
               </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col gap-3">
              <Link to="/dash" className="group/btn relative">
                <div className="absolute inset-0 bg-sky-400 rounded-2xl blur-md opacity-20 group-hover/btn:opacity-40 transition-opacity"></div>
                <button className="relative w-full bg-slate-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-[0.98]">
                  Open AssetVerse Dashboard
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </Link>
              
              <button className="w-full flex items-center justify-center gap-2 text-slate-400 py-3 rounded-xl text-sm font-semibold hover:text-slate-600 transition-colors">
                <Download size={14} />
                Download Invoice
              </button>
            </div>
          </div>
        </div>

        {/* Brand Footer */}
        <div className="mt-8 flex items-center justify-center gap-3 opacity-40 grayscale hover:grayscale-0 transition-all cursor-default">
           <Globe size={16} />
           <p className="text-[11px] font-bold tracking-widest uppercase">Secured by AssetVerse Systems</p>
        </div>
      </CardAnimation>
    </div>
  );
};

export default PaymentSuccess;