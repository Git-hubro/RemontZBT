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
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("Все");

  useEffect(() => {
    fetch("./projects.json")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading projects:", error);
        setLoading(false);
      });
  }, []);

  const categories = ["Все", ...new Set(projects.map((p) => p.category))];
  const filteredProjects =
    selectedCategory === "Все"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Портфолио проектов</h1>
        <p className="text-lg text-muted-foreground">
          Примеры выполненных работ по ремонту и отделке помещений
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Проектов не найдено</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Link key={project.id} href={`/portfolio/${project.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
                    <img
                      src={project.images[0]?.url}
                      alt={project.images[0]?.alt}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">{project.cost}</span>
                    <span className="text-muted-foreground">{project.duration}</span>
                  </div>
                  <div className="mt-4 flex items-center text-primary">
                    <span className="text-sm">Подробнее</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
