import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Пожалуйста, заполните все обязательные поля");
      return;
    }

    setLoading(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      toast.error("Ошибка при отправке формы. Пожалуйста, попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Свяжитесь с нами</h1>
          <p className="text-lg text-slate-200">
            Готовы начать свой проект? Напишите нам, и мы обсудим все детали
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Телефон
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Позвоните нам для консультации
                  </p>
                  <p className="text-lg font-semibold mt-2">+7 (XXX) XXX-XX-XX</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Отправьте нам письмо
                  </p>
                  <p className="text-lg font-semibold mt-2">info@example.com</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Адрес
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Наш офис
                  </p>
                  <p className="text-lg font-semibold mt-2">Ваш город, ул. Примерная, д. 1</p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Отправить сообщение</CardTitle>
                  <CardDescription>
                    Заполните форму, и мы ответим вам в течение 24 часов
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Имя *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ваше имя"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Email *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Телефон
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+7 (XXX) XXX-XX-XX"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Сообщение *
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Расскажите о вашем проекте..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? "Отправка..." : "Отправить"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
