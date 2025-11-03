import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Loader2, Play } from "lucide-react";

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

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}projects.json`)
      .then((res) => res.json())
      .then((data: Project[]) => {
        const found = data.find((p) => p.id === parseInt(id || "0"));
        setProject(found || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading project:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Проект не найден</h1>
        <Link href="/portfolio">
          Вернуться к портфолио
        </Link>
      </div>
    );
  }

  const currentImage = project.images[selectedImageIndex];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/portfolio">
            <Button variant="ghost" className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              Вернуться к портфолио
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Images Section */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {/* Main Image */}
              <div className="bg-slate-200 rounded-lg overflow-hidden aspect-video flex items-center justify-center relative">
                {currentImage ? (
                  <img
                    src={currentImage.url}
                    alt={currentImage.alt}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-muted-foreground">Изображение не найдено</div>
                )}
              </div>

              {/* Image Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {project.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === idx
                        ? "border-primary"
                        : "border-transparent hover:border-slate-300"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Image Label */}
              <div className="text-center text-sm text-muted-foreground">
                {currentImage?.type === "before" ? "📷 До ремонта" : "✨ После ремонта"}
              </div>

              {/* Video Section */}
              {project.videoUrl && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Видео проекта</h3>
                  {!showVideo ? (
                    <div
                      className="bg-slate-900 rounded-lg aspect-video flex items-center justify-center cursor-pointer hover:bg-slate-800 transition-colors"
                      onClick={() => setShowVideo(true)}
                    >
                      <Play className="w-16 h-16 text-white" />
                    </div>
                  ) : (
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        src={project.videoUrl}
                        title="Видео проекта"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
              <div className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm">
                {project.category}
              </div>
            </div>

            <Card>
              <CardHeader>
                Информация о проекте
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Стоимость</p>
                  <p className="text-2xl font-bold">{project.cost}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Сроки выполнения</p>
                  <p className="text-lg font-semibold">{project.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Дата завершения</p>
                  <p className="text-lg font-semibold">
                    {new Date(project.date).toLocaleDateString("ru-RU", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                Описание работ
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </CardContent>
            </Card>

            <Link href="/contact">
              <Button size="lg" className="w-full">
                Заказать похожий проект
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
