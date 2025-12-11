import React from 'react';
import CardAnimation from '../Animations/CardAnimation';

const Extras = () => {
    return (
        <div>

            {/* How It Works Section */}
            <section>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 mt-20 mb-10">
                        How AssetVerse Works
                    </h2>

                    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">

                        {/* Step 1 */}
                        <CardAnimation
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        delay={0.2}
                        className="bg-gray-50 p-8 rounded-xl shadow-[0px_8px_24px_rgba(149,157,165,0.2)]">
                            <div className="text-indigo-500 text-5xl mb-4">📝</div>
                            <h3 className="text-xl font-semibold mb-2">1. Register & Add Assets</h3>
                            <p className="text-gray-600">
                                Sign up and quickly add your assets to start managing them efficiently.
                            </p>
                        </CardAnimation>

                        {/* Step 2 */}
                        <CardAnimation
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        delay={0.4}
                        className="bg-gray-50 p-8 rounded-xl shadow-[0px_8px_24px_rgba(149,157,165,0.2)]">
                            <div className="text-indigo-500 text-5xl mb-4">📊</div>
                            <h3 className="text-xl font-semibold mb-2">2. Track & Monitor</h3>
                            <p className="text-gray-600">
                                Keep track of assets in real time and monitor performance through your dashboard.
                            </p>
                        </CardAnimation>

                        {/* Step 3 */}
                        <CardAnimation
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        delay={0.6}
                        className="bg-gray-50 p-8 rounded-xl shadow-[0px_8px_24px_rgba(149,157,165,0.2)]">
                            <div className="text-indigo-500 text-5xl mb-4">🔔</div>
                            <h3 className="text-xl font-semibold mb-2">3. Get Alerts & Insights</h3>
                            <p className="text-gray-600">
                                Receive maintenance alerts, usage statistics, and actionable insights to stay ahead.
                            </p>
                        </CardAnimation>

                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <div className='flex justify-center items-end'>
                <section>
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ">
                        <h2 className="text-3xl font-extrabold text-center text-gray-900 mt-20 mb-10">
                            Frequently Asked Questions
                        </h2>

                        <div className="space-y-6">
                            {/* FAQ 1 */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">1. How do I add my assets to AssetVerse?</h3>
                                <p className="text-gray-600 mt-2">
                                    Once you sign up, go to your dashboard and click 'Add Asset'. Fill in the details and save. It's that simple!
                                </p>
                            </div>

                            {/* FAQ 2 */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">2. Can multiple users access the same account?</h3>
                                <p className="text-gray-600 mt-2">
                                    Yes! AssetVerse supports multiple users with role-based access for teams and departments.
                                </p>
                            </div>

                            {/* FAQ 3 */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">3. Is my data secure?</h3>
                                <p className="text-gray-600 mt-2">
                                    Absolutely. AssetVerse uses industry-standard encryption and secure access controls to protect your data.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact CTA Section */}
                <section className="bg-[#52b6d6] py-16 rounded-lg">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                        <h2 className="text-3xl font-extrabold mb-4">
                            Ready to Simplify Your Asset Management?
                        </h2>
                        <p className="text-lg mb-8">
                            Sign up today and start managing your assets effortlessly with AssetVerse.
                        </p>
                        <a
                            href="#contact"
                            className="inline-block bg-white text-indigo-600 font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-gray-100 transition"
                        >
                            Get Started
                        </a>
                    </div>
                </section>
            </div>

        </div>
    );
};

export default Extras;