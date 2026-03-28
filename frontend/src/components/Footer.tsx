const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-black/50 to-orange-900/50 text-white py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,119,198,0.1))] opacity-50" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="text-3xl font-black bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent mb-6">
              Graze & Grain
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-md">
              Exquisite farm-to-table dining experience
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="w-12 h-12 bg-white/20 hover:bg-white/40 rounded-2xl flex items-center justify-center backdrop-blur-xl transition-all hover:scale-110"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-white/20 hover:bg-white/40 rounded-2xl flex items-center justify-center backdrop-blur-xl transition-all hover:scale-110"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-.14.01-.23.01-.83.0-1.49-.07-2.11-.19v.21c0 1.08 1.04 2.09 2.57 2.31-.27.74-.88 1.44-1.67 1.98-.18.12-.37.2-.56.31.21-.06.41-.09.61-.09 1.92 0 3.34-.66 4.23-1.64 1.29.25 2.6.1 3.84-.22-.13.49-.24.98-.35 1.47.98-.12 1.86-.44 2.67-.84 1.01.17 1.98.07 2.87-.25-.33.52-.74 1.01-1.22 1.38z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-black mb-8 bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
              Quick Links
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="/menu"
                  className="text-lg hover:text-orange-300 transition-colors block"
                >
                  Menu
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-lg hover:text-orange-300 transition-colors block"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/reservations"
                  className="text-lg hover:text-orange-300 transition-colors block"
                >
                  Reservations
                </a>
              </li>
              <li>
                <a
                  href="/admin/login"
                  className="text-lg hover:text-orange-300 transition-colors block"
                >
                  Admin
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-black mb-8 bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
              Contact
            </h4>
            <p className="text-lg mb-4">📍 123 Restaurant St, Food City</p>
            <p className="text-lg mb-4">📧 contact@grazeandgrain.com</p>
            <p className="text-lg mb-4">📞 +1 (555) 123-4567</p>
            <p className="text-lg">🕒 Open 11AM - 11PM</p>
          </div>
          <div>
            <h4 className="text-xl font-black mb-8 bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
              Hours
            </h4>
            <ul className="space-y-2">
              <li className="text-lg">Mon - Thu: 11AM - 10PM</li>
              <li className="text-lg">Fri - Sat: 11AM - 12AM</li>
              <li className="text-lg">Sun: 12PM - 9PM</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 pt-12 text-center">
          <p className="text-xl opacity-90">
            &copy; {new Date().getFullYear()} Graze & Grain. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
