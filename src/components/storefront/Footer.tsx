import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-premium py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">LUXE</h3>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              Curated furniture and décor for the modern home. Quality craftsmanship, timeless design.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-background/70 hover:text-background text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="#catalog" className="text-background/70 hover:text-background text-sm transition-colors">
                  Shop All
                </a>
              </li>
              <li>
                <a href="#about" className="text-background/70 hover:text-background text-sm transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background text-sm transition-colors">
                  Track Order
                </a>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-display font-semibold mb-4">Policies</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-background/70 hover:text-background text-sm transition-colors">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background text-sm transition-colors">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background text-sm transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background text-sm transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-background/50 flex-shrink-0 mt-0.5" />
                <span className="text-background/70 text-sm">
                  123 Design District,<br />Mumbai, MH 400001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-background/50" />
                <a href="mailto:hello@luxe.com" className="text-background/70 hover:text-background text-sm transition-colors">
                  hello@luxe.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-background/50" />
                <a href="tel:+919876543210" className="text-background/70 hover:text-background text-sm transition-colors">
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-background/10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/50">
          <p>© 2025 LUXE. All rights reserved.</p>
          <p>Made with care for beautiful spaces.</p>
        </div>
      </div>
    </footer>
  );
}
