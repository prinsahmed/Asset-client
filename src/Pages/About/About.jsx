import React from 'react';

const About = () => {
    return (
      <section className="relative overflow-hidden bg-base-100 text-base-content  py-24 sm:py-32">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 blur-3xl opacity-20 pointer-events-none">
          <div className="aspect-[1000/600] w-[60rem] bg-gradient-to-tr from-[#87CEEB] to-[#00BFFF]"></div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-sky-500 uppercase tracking-widest">Our Vision</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Your Assets. One Universe.</p>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              In a world of fragmented data, <span className="font-semibold text-sky-600">AssetVerse</span> provides the clarity you need. We’ve built a command center designed to turn complexity into a clear blue horizon.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              
              <div className="flex flex-col p-8 rounded-2xl bg-sky-50  border border-sky-100 transition-hover hover:shadow-lg duration-300">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                  <span className="text-sky-500 text-2xl">☁️</span>
                  Limitless Clarity
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                  <p className="flex-auto">Experience a platform that scales with your ambitions. From physical property to digital portfolios, see everything in one expansive view.</p>
                </dd>
              </div>

              <div className="flex flex-col p-8 rounded-2xl bg-sky-50 border border-sky-100 transition-hover hover:shadow-lg duration-300">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                  <span className="text-sky-500 text-2xl">⚡</span>
                  Agile Velocity
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                  <p className="flex-auto">Built on high-performance architecture so you can track, manage, and move assets at the speed of thought.</p>
                </dd>
              </div>

              <div className="flex flex-col p-8 rounded-2xl bg-sky-50 border border-sky-100 transition-hover hover:shadow-lg duration-300">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                  <span className="text-sky-500 text-2xl">🛡️</span>
                  Ironclad Security
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                  <p className="flex-auto">Your universe is protected. We use enterprise-grade encryption to ensure that your asset data remains yours alone.</p>
                </dd>
              </div>

            </dl>
          </div>

          <div className="mt-16 text-center">
            <a href="#" className="inline-block rounded-full bg-sky-500 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 transition-all">
              Explore the Universe
            </a>
          </div>
        </div>
      </section>
    );
};

export default About;