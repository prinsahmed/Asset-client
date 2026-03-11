import React from 'react';

const ContactUs = () => {
    return (
      <section className="relative isolate bg-base-100 text-base-content  py-24 sm:py-32">
      {/* Top Decorative Gradient Blobs */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#87CEEB] to-[#00BFFF] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-sky-500 uppercase tracking-widest">Connect with Us</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Your Gateway to the Verse.</p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Have questions about managing your assets, navigating the platform, or securing your universe? Our specialists are ready to provide the clarity you need.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          
          {/* Column 1: Contact Form Box */}
          <form className="p-10 rounded-3xl bg-sky-50 border border-sky-100 shadow-lg">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              
              <div>
                <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-slate-900">First name</label>
                <div className="mt-2.5">
                  <input type="text" name="first-name" id="first-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-slate-900">Last name</label>
                <div className="mt-2.5">
                  <input type="text" name="last-name" id="last-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-slate-900">Email Address</label>
                <div className="mt-2.5">
                  <input type="email" name="email" id="email" className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-slate-900">How can we help?</label>
                <div className="mt-2.5">
                  <textarea name="message" id="message" rows="4" className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"></textarea>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <button type="submit" className="block w-full rounded-full bg-sky-500 px-8 py-3.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 transition-all">
                Submit Command
              </button>
            </div>
          </form>

          {/* Column 2: Contact Information */}
          <div className="space-y-12 lg:pt-10">
            <div className="flex flex-col gap-6 p-8 rounded-2xl bg-white border border-slate-100 transition-hover hover:shadow-lg duration-300">
              <div className="flex items-center gap-x-4 text-base font-semibold leading-7 text-slate-900">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100 text-sky-500">⚡</span>
                <span>Technical Support</span>
              </div>
              <p className="text-sm leading-6 text-slate-600">
                Encountering a bug? Our support engineers are standing by.
                <a href="mailto:support@assetverse.io" className="block mt-1 font-medium text-sky-600 underline">support@assetverse.io</a>
              </p>
            </div>

            <div className="flex flex-col gap-6 p-8 rounded-2xl bg-white border border-slate-100 transition-hover hover:shadow-lg duration-300">
              <div className="flex items-center gap-x-4 text-base font-semibold leading-7 text-slate-900">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100 text-sky-500">📍</span>
                <span>Mission Control</span>
              </div>
              <p className="text-sm leading-6 text-slate-600">
                123 Infinity Loop, Suite 101<br />
                San Francisco, CA 94107
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    );
};

export default ContactUs;