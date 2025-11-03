import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Loader2 } from "lucide-react";

interface ProjectImage {
  type: "before" | "after";
  url: string;
  alt: string;
}

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  images: ProjectImage[];
  videoUrl: string | null;
  cost: string;
  duration: string;
  date: string;
  fullDescription: string;  // ← ДОБАВЛЕНО (для полного описания проекта)
  works: string[];          // ← ДОБАВЛЕНО (для списка выполненных работ)
}

// Пример реального объекта с вашими данными:
const exampleProject: Project = {
  id: 1,
  title: "Студия 25 кв.м (м. Балтийская) - Проект 1",
  category: "Студии",
  description: "Полный ремонт и сдача в аренду под ключ. Выполнены черновые и чистовые работы, монтаж всех коммуникаций.",
  images: [
    {
      type: "before",
      url: "/assets/studio-baltiyskaya-1-before.jpg",
      alt: "До ремонта - студия 25 кв.м"
    },
    {
      type: "after",
      url: "/assets/studio-baltiyskaya-1-after.jpg",
      alt: "После ремонта - студия 25 кв.м"
    }
  ],
  videoUrl: null,
  cost: "от 800 000 ₽",
  duration: "45 дней",
  date: "2024-10-15",
  fullDescription: "Студия площадью 25 кв.м на м. Балтийская. Проект 'под ключ' включает полный ремонт с черновыми и чистовыми работами, монтаж всех коммуникаций и последующее управление сдачей в аренду.",
  works: [
    "Черновая сантехника (прокладка труб канализации, ХВС и ГВС; монтаж коллекторного узла; установка системы защиты от протечек Нептун; монтаж бойлера)",
    "Черновая электрика (прокладка кабелей ТВ, установка автоматов на бойлер и Нептун; добавлены розетки и выключатели по проекту)",
    "Малярные работы (заделка всех штроб, штукатурка, шпаклевка, шлифовка стен; проклейка обоев; нанесение декоративной штукатурки)",
    "Чистовая сантехника (установка всей сантехники в ванной и подключение смесителя на кухне; подключение гейзера)",
    "Чистовая электрика (монтаж всех розеток и выключателей; установка ночников)",
    "Монтаж натяжного потолка по всей квартире (монтаж закладных для потолочных встроенных светильников, карниза; подвесных потолочных люстр)",
    "Отделочные работы (установка двери скрытого монтажа; монтаж плинтуса; установка подоконника; подбор кухни и мебели)",
    "Подбор арендосъемщика и заключения договора найма жилого помещения"
  ]
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("Все");

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}projects.json`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading projects:", err);
        setLoading(false);
      });
  }, []);

  const categories = ["Все", ...Array.from(new Set(projects.map((p) => p.category)))];
  const filteredProjects = selectedCategory === "Все" ? projects : projects.filter((p) => p.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Портфолио проектов</h1>
          <p className="text-lg text-slate-200">
            Примеры выполненных работ по ремонту и отделке помещений
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
                className="rounded-full"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Проектов не найдено</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
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
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Стоимость:</span>
                          <span className="font-semibold">{project.cost}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Сроки:</span>
                          <span className="font-semibold">{project.duration}</span>
                        </div>
                      </div>
                      <Button variant="ghost" className="w-full justify-between group">
                        Подробнее
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
