import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Loader2, Play } from "lucide-react";

interface ProjectImage {
  type: "before" | "after" | "other";
  url: string;
  alt: string;
}

interface VideoItem {
  url: string;
  alt: string;
}

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  images: ProjectImage[];
  videos?: VideoItem[];
  videoUrl?: string | null;
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
        <Loader2 className="animate-spin w-10 h-10 text-primary" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <p className="text-xl mb-4">Проект не найден</p>
        <Link href="/portfolio">
          <Button variant="outline">
            <ChevronLeft className="w-4 h-4 mr-2" /> Вернуться к портфолио
          </Button>
        </Link>
      </div>
    );
  }

  const currentImage = project.images[selectedImageIndex];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="max-w-4xl mx-auto py-8 flex items-center gap-4">
        <Link href="/portfolio">
          <Button variant="outline" size="sm" className="gap-2">
            <ChevronLeft className="w-4 h-4" />
            Вернуться к портфолио
          </Button>
        </Link>
        <span className="text-muted-foreground">/ {project.title}</span>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Images Section */}
        <div>
          {/* Main Image */}
          {currentImage ? (
            <div className="aspect-video rounded-lg overflow-hidden mb-2 border">
              <img
                src={currentImage.url}
                alt={currentImage.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="aspect-video flex items-center justify-center rounded-lg border bg-slate-100 text-muted-foreground">
              Изображение не найдено
            </div>
          )}

          {/* Image Thumbnails */}
          <div className="flex gap-2 mt-2 overflow-auto pb-2">
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
          <div className="mt-2 text-sm text-muted-foreground text-center">
            {currentImage?.type === "before"
              ? "📷 До ремонта"
              : currentImage?.type === "after"
              ? "✨ После ремонта"
              : ""}
          </div>

          {/* Видео через массив videos */}
          {project.videos && project.videos.length > 0 && (
            <div className="mt-8 space-y-8">
              <h3 className="text-lg font-semibold mb-4">Видео</h3>
              {project.videos.map((video, idx) => {
                const isYoutube =
                  video.url.includes("youtube.com") ||
                  video.url.includes("youtu.be");
                // Получение ID видео для YouTube
                let youtubeId = "";
                if (isYoutube) {
                  if (video.url.includes("youtu.be/")) {
                    youtubeId = video.url
                      .split("youtu.be/")[1]
                      ?.split(/[?&]/)[0];
                  } else if (video.url.includes("v=")) {
                    youtubeId = video.url
                      .split("v=")[1]
                      ?.split(/[?&]/)[0];
                  }
                }
                return (
                  <div key={idx} className="aspect-video rounded-lg overflow-hidden">
                    {isYoutube && youtubeId ? (
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${youtubeId}`}
                        title={video.alt || `Видео ${idx + 1}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ minHeight: 315 }}
                      />
                    ) : (
                      <video
                        src={video.url}
                        controls
                        width="100%"
                        height="100%"
                        title={video.alt || `Видео ${idx + 1}`}
                        style={{ minHeight: 315 }}
                      >
                        Ваш браузер не поддерживает видео.
                      </video>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Видео-поле для совместимости с видеоUrl */}
          {project.videoUrl && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Видео проекта</h3>
              <video
                src={project.videoUrl}
                controls
                width="100%"
                height="100%"
                style={{ minHeight: 315 }}
              >
                Ваш браузер не поддерживает видео.
              </video>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <div className="text-muted-foreground text-sm">{project.category}</div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Стоимость:</span>
                  <span className="font-semibold">{project.cost}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Сроки выполнения:</span>
                  <span className="font-semibold">{project.duration}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Дата завершения:</span>
                  <span className="font-semibold">
                    {new Date(project.date).toLocaleDateString("ru-RU", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
              <div>
                <div className="font-semibold mb-2">Описание работ</div>
                <div>{project.description}</div>
              </div>
            </CardContent>
          </Card>
          <div className="mt-6 text-center">
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                Заказать похожий проект
                <Play className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
