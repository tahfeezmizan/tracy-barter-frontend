import { Home, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          <div className="grid-cols-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white rounded-lg p-2">
                <Home className="h-6 w-6 text-slate-900" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Happy Valley
                </h3>
                <p className="text-sm text-slate-400">Home Concierge</p>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Trusted home management and concierge services providing peace of
              mind to homeowners.
            </p>
          </div>

          <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-white mb-6">
                Contact Us
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-slate-400 mt-1 flex-shrink-0" />
                  <span className="text-slate-300">
                    info@happyvalleyconcierge.com
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-slate-400 mt-1 flex-shrink-0" />
                  <span className="text-slate-300">814-883-5114</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-slate-400 mt-1 flex-shrink-0" />
                  <span className="text-slate-300">Happy Valley, PA</span>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <h4 className="text-lg font-semibold text-white mb-6">
                Office Hours
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="text-slate-300 font-medium">Monday – Friday</p>
                  <p className="text-slate-400">8:30 AM – 5:00 PM</p>
                </div>
                <div>
                  <p className="text-slate-300 font-medium">
                    Emergency services available 24/7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <p className="text-center text-slate-400 text-sm">
            © 2025 Happy Valley Home Concierge, LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
