import React from 'react';
import CardAnimation from '../Animations/CardAnimation';




const Feature = () => {



    return (
        <section>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 mt-20 mb-10">Key Features</h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">


                    <CardAnimation
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        delay={0.1}
                        className="bg-white p-8 rounded-xl  hover:shadow-2xl transition duration-400">
                        <div className="text-indigo-500 text-5xl mb-4">📊</div>
                        <h3 className="text-xl font-semibold mb-2">Dashboard Overview</h3>
                        <p className="text-gray-600">See all your assets in one intuitive dashboard for quick insights.</p>
                    </CardAnimation>


                    <CardAnimation
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        delay={0}
                        className="bg-white p-8 rounded-xl  hover:shadow-2xl transition duration-400">
                        <div className="text-indigo-500 text-5xl mb-4">🛰️</div>
                        <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
                        <p className="text-gray-600">Get live updates on your assets’ location and status anytime.</p>
                    </CardAnimation>


                    <CardAnimation
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        delay={0.1}
                        className="bg-white p-8 rounded-xl  hover:shadow-2xl transition duration-400">
                        <div className="text-indigo-500 text-5xl mb-4">🔒</div>
                        <h3 className="text-xl font-semibold mb-2">Secure Access</h3>
                        <p className="text-gray-600">Role-based access ensures your data is safe and private.</p>
                    </CardAnimation>

                </div>
            </div>
        </section>
    );
};

export default Feature;