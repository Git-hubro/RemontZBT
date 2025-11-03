import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Hammer, Clock, DollarSign } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  images: Array<{
    type: "before" | "after";
    url: string;
    alt: string;
  }>;
  videoUrl: string | null;
  cost: string;
  duration: string;
  date: string;
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}projects.json`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading projects:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Профессиональный ремонт и отделка
              </h1>
              <p className="text-xl text-slate-200 mb-8 leading-relaxed">
                Превращаем ваши идеи в реальность. Качественный ремонт кухонь, ванных комнат и жилых помещений с гарантией результата.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/portfolio">
                  <Button size="lg" className="gap-2">
                    Смотреть портфолио
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <Link href="/contact">
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-slate-900">
                    Заказать консультацию
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-gradient-to-br from-slate-700 to-slate-600 rounded-lg aspect-square flex items-center justify-center">
                <Hammer className="w-32 h-32 text-slate-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Почему выбирают нас</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Clock className="w-8 h-8 text-primary mb-2" />
                Точные сроки
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Мы уважаем ваше время и всегда придерживаемся согласованного графика работ.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <DollarSign className="w-8 h-8 text-primary mb-2" />
                Честные цены
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Прозрачное ценообразование без скрытых расходов. Смета согласуется заранее.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Hammer className="w-8 h-8 text-primary mb-2" />
                Качество работ
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Используем только качественные материалы и современные технологии отделки.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Последние проекты</h2>
            <Link href="/portfolio">
              <Button variant="outline" className="gap-2">
                Все проекты
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Загрузка проектов...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link href={`/project/${project.id}`} key={project.id}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <div className="relative h-48 bg-slate-200 overflow-hidden">
                      <img
                        src={project.images[project.images.length - 1]?.url || ""}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                      <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm">
                        {project.category}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{project.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Стоимость:</span>
                          <span className="font-semibold">{project.cost}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Сроки:</span>
                          <span className="font-semibold">{project.duration}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Готовы начать свой проект?
          </h2>
          <p className="text-lg mb-8 text-primary-foreground/90">
            Свяжитесь с нами сегодня для бесплатной консультации и расчета стоимости
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="gap-2">
              Заказать консультацию
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
