import React from 'react';

const Statistics = () => {
    return (

        <section class="bg-gray-100 py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                
                <h2 class="text-3xl font-extrabold text-gray-900 mb-12">What Our Clients Say & Stats</h2>

                
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
                    <div class="bg-white rounded-xl p-8 shadow-lg">
                        <h3 class="text-4xl font-extrabold text-indigo-600">100+</h3>
                        <p class="text-gray-600 mt-2">Companies Trust Us</p>
                    </div>
                    <div class="bg-white rounded-xl p-8 shadow-lg">
                        <h3 class="text-4xl font-extrabold text-indigo-600">5000+</h3>
                        <p class="text-gray-600 mt-2">Assets Managed</p>
                    </div>
                    <div class="bg-white rounded-xl p-8 shadow-lg">
                        <h3 class="text-4xl font-extrabold text-indigo-600">99.9%</h3>
                        <p class="text-gray-600 mt-2">Uptime Guarantee</p>
                    </div>
                </div>

                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    <div class="bg-white p-8 rounded-xl shadow-lg">
                        <p class="text-gray-600 italic">"AssetVerse transformed how we manage our assets. Tracking has never been easier!"</p>
                        <h4 class="mt-4 font-semibold text-gray-900">— John Smith, CFO, TechCorp</h4>
                    </div>

                    
                    <div class="bg-white p-8 rounded-xl shadow-lg">
                        <p class="text-gray-600 italic">"The real-time updates and dashboard insights save our team countless hours every week."</p>
                        <h4 class="mt-4 font-semibold text-gray-900">— Sarah Lee, Operations Manager, FinAsset</h4>
                    </div>

                    
                    <div class="bg-white p-8 rounded-xl shadow-lg">
                        <p class="text-gray-600 italic">"Secure and easy to use. AssetVerse is a must-have for any growing business."</p>
                        <h4 class="mt-4 font-semibold text-gray-900">— Michael Chen, CEO, GlobalAssets</h4>
                    </div>
                </div>

            </div>
        </section>

    );
};

export default Statistics;