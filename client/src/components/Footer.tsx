import { Link } from "wouter";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">🏠 Ремонт & Отделка</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Профессиональный ремонт и отделка помещений с гарантией качества. Более 10 лет опыта в отрасли.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Навигация</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/">
                  <a className="text-slate-300 hover:text-white transition-colors">
                    Главная
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/portfolio">
                  <a className="text-slate-300 hover:text-white transition-colors">
                    Портфолио
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-slate-300 hover:text-white transition-colors">
                    Контакты
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Контакты</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4" />
                <span>+7 (XXX) XXX-XX-XX</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4" />
                <span>info@example.com</span>
              </li>
              <li className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Ваш город, ул. Примерная, д. 1</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>&copy; 2024 Ремонт & Отделка. Все права защищены.</p>
            <p>Создано с помощью Manus</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
