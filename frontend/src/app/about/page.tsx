import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50/80">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-600 via-red-500/95 to-amber-600">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-white via-orange-100 to-yellow-100 bg-clip-text text-transparent drop-shadow-4xl animate-fade-in">
            ABOUT
          </h1>
          <p className="text-2xl md:text-4xl font-light max-w-4xl mx-auto leading-relaxed text-orange-100/95 backdrop-blur-xl">
            Where farm-fresh ingredients meet culinary artistry
          </p>
          <div className="mt-12 flex flex-col lg:flex-row gap-8 justify-center">
            <div className="group">
              <a
                href="/menu"
                className="px-12 py-8 text-xl font-black rounded-3xl bg-white/95 text-orange-600 hover:bg-orange-50 shadow-4xl hover:shadow-orange-500/40 border-4 border-white/30 hover:border-orange-300/50 backdrop-blur-3xl hover:scale-105 transition-all duration-700"
              >
                Explore Menu
              </a>
            </div>
            <div className="group">
              <a
                href="/reservations"
                className="px-12 py-8 text-xl font-black rounded-3xl border-4 border-white/50 bg-black/30 hover:bg-white/20 text-white hover:text-orange-600 shadow-2xl hover:shadow-orange-400/30 backdrop-blur-3xl hover:scale-105 transition-all duration-700"
              >
                Reserve Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-32 relative -mt-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-5xl md:text-7xl font-black mb-12 bg-gradient-to-r from-gray-900 via-orange-600 to-red-600 bg-clip-text text-transparent drop-shadow-3xl">
                Our Story
              </h2>
              <p className="text-2xl text-gray-700 mb-12 leading-relaxed max-w-2xl font-light">
                Founded by passionate food artisans, Graze & Grain bridges the
                gap between pristine farms and your plate. Every ingredient
                travels mere miles, preserving peak freshness and flavor.
              </p>
              <p className="text-xl text-gray-600 mb-16 leading-relaxed max-w-xl">
                Our open kitchen philosophy lets you witness culinary magic
                unfold. Tradition perfected through innovation.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="group">
                  <div className="w-24 h-24 mb-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all">
                    <span className="text-2xl font-black text-white">🌾</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Local Farms
                  </h4>
                  <p className="text-gray-600">100 mile radius</p>
                </div>
                <div className="group">
                  <div className="w-24 h-24 mb-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all">
                    <span className="text-2xl font-black text-white">👨‍🍳</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Master Chefs
                  </h4>
                  <p className="text-gray-600">20+ years experience</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative h-96 lg:h-[600px] rounded-3xl overflow-hidden shadow-4xl group">
              <Image
                src="/images/restaurant.jpg"
                alt="Restaurant interior"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000 brightness-110 rounded-3xl"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 bg-gradient-to-r from-orange-500/5 via-red-500/3 to-orange-500/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-32">
            <h2 className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent drop-shadow-4xl">
              Our Values
            </h2>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto font-light">
              Sustainability • Authenticity • Excellence
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="group text-center p-12 rounded-3xl bg-white/70 backdrop-blur-xl border border-orange-200/50 hover:border-orange-400/70 shadow-2xl hover:shadow-orange-500/30 hover:-translate-y-6 transition-all duration-700">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-emerald-500 to-green-500 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all">
                <span className="text-4xl">🌱</span>
              </div>
              <h3 className="text-4xl font-black text-gray-900 mb-6">
                Sustainable
              </h3>
              <p className="text-xl text-gray-700 leading-relaxed max-w-lg mx-auto">
                Zero-waste kitchen, local sourcing, seasonal menus. Planet
                first, always.
              </p>
            </div>
            <div className="group text-center p-12 rounded-3xl bg-white/70 backdrop-blur-xl border border-orange-200/50 hover:border-orange-400/70 shadow-2xl hover:shadow-orange-500/30 hover:-translate-y-6 transition-all duration-700">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all">
                <span className="text-4xl">❤️</span>
              </div>
              <h3 className="text-4xl font-black text-gray-900 mb-6">
                Authentic
              </h3>
              <p className="text-xl text-gray-700 leading-relaxed max-w-lg mx-auto">
                Family recipes perfected over generations. Honest cooking from
                the heart.
              </p>
            </div>
            <div className="group text-center p-12 rounded-3xl bg-white/70 backdrop-blur-xl border border-orange-200/50 hover:border-orange-400/70 shadow-2xl hover:shadow-orange-500/30 hover:-translate-y-6 transition-all duration-700">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all">
                <span className="text-4xl">⭐</span>
              </div>
              <h3 className="text-4xl font-black text-gray-900 mb-6">
                Excellence
              </h3>
              <p className="text-xl text-gray-700 leading-relaxed max-w-lg mx-auto">
                Michelin-level attention to detail in every single plate we
                serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-32">
            <h2 className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-gray-900 to-orange-600 bg-clip-text text-transparent drop-shadow-4xl">
              Our Chefs
            </h2>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto font-light">
              Masters of their craft, creators of unforgettable experiences
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="group relative rounded-3xl overflow-hidden shadow-4xl hover:shadow-orange-500/40 border-4 border-white/20 hover:border-orange-400/50 bg-gradient-to-br from-white/90 to-orange-50/50 backdrop-blur-xl hover:-translate-y-4 transition-all duration-700">
              <div className="h-96 relative">
                <Image
                  src="/images/default-dish.jpg"
                  alt="Chef 1"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000 brightness-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-4xl font-black text-white mb-4 drop-shadow-2xl">
                  Chef John
                </h3>
                <p className="text-xl text-orange-200 font-bold drop-shadow-xl">
                  Executive Chef
                </p>
              </div>
            </div>
            <div className="group relative rounded-3xl overflow-hidden shadow-4xl hover:shadow-orange-500/40 border-4 border-white/20 hover:border-orange-400/50 bg-gradient-to-br from-white/90 to-orange-50/50 backdrop-blur-xl hover:-translate-y-4 transition-all duration-700">
              <div className="h-96 relative">
                <Image
                  src="/images/default-dish.jpg"
                  alt="Chef 2"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000 brightness-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-4xl font-black text-white mb-4 drop-shadow-2xl">
                  Sarah Lee
                </h3>
                <p className="text-xl text-orange-200 font-bold drop-shadow-xl">
                  Pastry Chef
                </p>
              </div>
            </div>
            <div className="group relative rounded-3xl overflow-hidden shadow-4xl hover:shadow-orange-500/40 border-4 border-white/20 hover:border-orange-400/50 bg-gradient-to-br from-white/90 to-orange-50/50 backdrop-blur-xl hover:-translate-y-4 transition-all duration-700">
              <div className="h-96 relative">
                <Image
                  src="/images/default-dish.jpg"
                  alt="Chef 3"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000 brightness-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-4xl font-black text-white mb-4 drop-shadow-2xl">
                  Mike Chen
                </h3>
                <p className="text-xl text-orange-200 font-bold drop-shadow-xl">
                  Sous Chef
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
