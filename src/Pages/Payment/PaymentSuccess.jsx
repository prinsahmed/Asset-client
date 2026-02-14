import React, { useContext, useEffect } from 'react';
import CardAnimation from '../../Components/Animations/CardAnimation';
import { ArrowRight, CheckCircle, Download } from 'lucide-react';
import { Link, useSearchParams } from 'react-router';
import { useAxios } from '../../Hooks/Api/useAxios';
import { useMutation } from '@tanstack/react-query';
import { AuthContext } from '../../Context/Context';

const PaymentSuccess = () => {
    const { userData, setReload } = useContext(AuthContext);
    const axiosSecure = useAxios();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');

    const mutation = useMutation({
        mutationFn: (id) => axiosSecure.get(`/payment-status?session_id=${id}`),
        onSuccess: () => {
            setReload(prev => !prev);
        }
    });

    useEffect(() => {
        if (sessionId) {
            mutation.mutate(sessionId);
        }
    }, [sessionId]);


    if (mutation.isPending) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-slate-600 font-medium">Verifying your payment...</p>
            </div>
        );
    }


    if (mutation.isError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
                    <p className="text-red-500 font-bold text-lg">Verification Failed</p>
                    <p className="text-slate-500 mt-2">We couldn't verify this session. Please contact support.</p>
                    <Link to="/" className="mt-4 inline-block text-blue-600 underline">Go back home</Link>
                </div>
            </div>
        );
    }


    if (!mutation.isSuccess) return null;


    const paymentInfo = mutation.data?.data;



    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
            <CardAnimation
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center relative">
                    <CardAnimation
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-full mb-4"
                    >
                        <CheckCircle className="text-white" size={48} strokeWidth={3} />
                    </CardAnimation>
                    <h1 className="text-2xl font-bold text-white">Payment Successful!</h1>

                    <div className='text-blue-100 text-sm mt-3 space-y-1'>
                        <p>Name: <span className="text-white font-medium">{paymentInfo?.userName}</span></p>
                        <p>Email: <span className="text-white font-medium">{paymentInfo?.userEmail}</span></p>
                        <p className="opacity-70 italic">Transaction: {paymentInfo?.transactionId}</p>
                    </div>
                </div>

                <div className="p-8">
                    <div className="text-center mb-8">
                        <p className="text-slate-600">Your account has been upgraded to</p>
                        <h2 className="text-3xl font-black text-slate-900 mt-1 uppercase tracking-tight">
                            {paymentInfo?.packageName} Plan
                        </h2>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8">
                        <div className="flex justify-between items-center mb-3 text-sm">
                            <div className="text-slate-500">
                                Amount Paid: <span className="font-bold text-slate-700">${paymentInfo?.packageAmount}</span>
                            </div>
                            <span className='text-xs font-bold uppercase tracking-wider text-white rounded-lg px-2 py-1 bg-green-500'>
                                {paymentInfo?.paymentStatus || 'Paid'}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">New Employee Limit:</span>
                            
                            <span className="font-bold text-blue-600">Up to {userData?.packageLimit} Employees</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Link to="/dash">
                            <button className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-all group">
                                Go to Dashboard
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>
                </div>
            </CardAnimation>
        </div>
    );
};

export default PaymentSuccess;