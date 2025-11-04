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

// Adding a test project to the Portfolio component
const testProject = {
  name: 'Тестовый проект',
  description: 'Описание тестового проекта',
  cost: '1000',
  duration: '1 месяц'
};

// Assuming there is an array named 'projects' in the Portfolio component
projects.push(testProject);

  id: number;
  title: string;
  category: string;
  description: string;
  images: ProjectImage[];
  videoUrl: string | null;
  cost: string;
  duration: string;
  date: string;
  fullDescription: string;
  works: string[];
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string>("Все проекты");
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setIsLoading(true);
        const response = await fetch("/projects.json");
        if (!response.ok) throw new Error("Не удалось загрузить проекты");
        const data = await response.json();
        setProjects(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка загрузки");
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const categories = ["Все проекты", "Студии", "1-комнатные", "2-комнатные"];
  const filteredProjects =
    activeCategory === "Все проекты"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-4">
            Наши проекты
          </h1>
          <p className="text-center text-muted-foreground">
            Выполненные объекты под ключ с гарантией качества
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 min-h-[400px] flex items-center justify-center">
            {error}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center text-muted-foreground min-h-[400px] flex items-center justify-center">
            Проектов пока нет
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Link href={`/portfolio/${project.id}`} key={project.id}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={project.images[0]?.url || "/placeholder.jpg"}
                      alt={project.images[0]?.alt || project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{project.title}</CardTitle>
                    <CardDescription>{project.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {project.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Стоимость:</span>
                        <span className="font-semibold">{project.cost}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Сроки:</span>
                        <span className="font-semibold">{project.duration}</span>
                      </div>
                    </div>
                    <Button className="w-full justify-between group" variant="ghost">
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
    </div>
  );
}
