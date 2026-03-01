import React, { useContext } from "react";
import CardAnimation from "../Animations/CardAnimation";
import { Check, Crown, Shield, Star, Zap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../../Hooks/Api/useAxios";
import { AuthContext } from "../../Context/Context";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/Gears Lottie Animation.json";
import { useNavigate } from "react-router";

const PricingCard = () => {
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const { user, userData } = useContext(AuthContext);

  const { data: assets = [], isLoading } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure.get("/upgrade-package");
      return res.data;
    },
    enabled: !!userData || userData?.role !== "Employee",
  });

  if (userData?.role === "Employee") return;

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Lottie
          style={{ width: 200, height: 200 }}
          animationData={loadingAnimation}
          loop={true}
        />
      </div>
    );

  const Premium = assets[0];
  const Basic = assets[1];
  const Standard = assets[2];

  function handleUpgrade(id) {
    if (!user) navigate("/auth/login");

    const paymentInfo = {
      id: id,
      email: user?.email,
    };

    axiosSecure.post("/create-checkout-session", paymentInfo).then((res) => {
      window.location.href = res.data.url;
    });
  }



  return (
    <div>
      <h2 className="text-3xl text-center font-extrabold text-gray-900 pt-10 lg:pt-24 md:pt-20 lg:mb-13 md:mb-8 mb-4">
        Upgrade Package
      </h2>
      <div className=" mx-auto ">
        <div className="  grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          {/* BASIC PACKAGE */}
          <CardAnimation
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600">
                <Zap size={28} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">{Basic?.name}</h3>
            <p className="text-slate-500 text-sm mt-2">
              Essential management for small startups.
            </p>
            <div className="mt-6 mb-2">
              <span className="text-4xl font-black text-slate-900">
                ${Basic?.price}
              </span>
              <span className="text-slate-500 font-medium"> /month</span>
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 py-1 px-3 rounded-full self-start mb-8">
              Limit: {Basic?.employeeLimit} Employees
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              {Basic?.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-slate-600"
                >
                  <Check size={18} className="text-emerald-500 flex-shrink-0" />
                  <span className="text-sm font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleUpgrade(Basic?._id)}
              className="w-full py-4 rounded-xl font-bold border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Get Started
            </button>
          </CardAnimation>

          {/* STANDARD PACKAGE (FEATURED) */}
          <CardAnimation
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative bg-white rounded-3xl p-6 border-2 border-blue-600 shadow-2xl transform md:-translate-y-8 flex flex-col"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg flex items-center gap-1">
              <Star size={12} fill="white" /> Most Popular
            </div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-blue-100 rounded-2xl text-blue-600">
                <Shield size={28} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              {Standard?.name}
            </h3>
            <p className="text-slate-500 text-sm mt-2">
              Scale your business with advanced tools.
            </p>
            <div className="mt-6 mb-2">
              <span className="text-4xl font-black text-slate-900">
                ${Standard?.price}
              </span>
              <span className="text-slate-500 font-medium"> /month</span>
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 py-1 px-3 rounded-full self-start mb-8">
              Limit: {Standard?.employeeLimit} Employees
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              {Standard?.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-slate-700"
                >
                  <Check size={18} className="text-blue-600 flex-shrink-0" />
                  <span className="text-sm font-semibold">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleUpgrade(Standard?._id)}
              className="w-full py-4 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all duration-200 cursor-pointer"
            >
              Upgrade Now
            </button>
          </CardAnimation>

          {/* PREMIUM PACKAGE */}

          <CardAnimation
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors duration-500">
                <Crown size={28} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white">{Premium?.name}</h3>
            <p className="text-slate-400 text-sm mt-2">
              Maximum power for professional teams.
            </p>
            <div className="mt-6 mb-2">
              <span className="text-4xl font-black text-white">
                $ {Premium?.price}
              </span>
              <span className="text-slate-400 font-medium">/month</span>
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-purple-300 bg-purple-500/20 py-1 px-3 rounded-full self-start mb-8">
              Limit: {Premium?.employeeLimit} Employees
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              {Premium?.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-slate-300"
                >
                  <Check size={18} className="text-purple-400 flex-shrink-0" />
                  <span className="text-sm font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleUpgrade(Premium?._id)}
              className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 transition-opacity duration-200 shadow-lg shadow-purple-900/20 cursor-pointer"
            >
              Go Unlimited
            </button>
          </CardAnimation>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
