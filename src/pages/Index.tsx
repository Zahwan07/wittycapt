import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Sparkles, Copy, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Caption {
  tone: string;
  text: string;
}

const Index = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Mohon upload file gambar (jpg/png)");
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setCaptions([]);
    }
  };

  const generateCaptions = async () => {
    if (!image) {
      toast.error("Upload foto produk terlebih dahulu!");
      return;
    }

    setIsGenerating(true);
    setCaptions([]);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result as string;

        const { data, error } = await supabase.functions.invoke("generate-captions", {
          body: { image: base64Image },
        });

        if (error) throw error;

        setCaptions(data.captions);
        toast.success("Caption berhasil dibuat!");
      };
      reader.readAsDataURL(image);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Gagal generate caption. Coba lagi ya!");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success("Caption disalin!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-warm">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-warm bg-clip-text text-transparent">
                AI Caption Maker
              </h1>
              <p className="text-sm text-muted-foreground">
                Generate 10 caption otomatis hanya dari foto produk
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Upload Section */}
        <Card className="p-8 mb-8 shadow-card border-border/50 bg-gradient-hero">
          <div className="text-center space-y-6">
            {!imagePreview ? (
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="border-2 border-dashed border-border rounded-xl p-12 hover:border-primary transition-all hover:bg-card/50">
                  <Upload className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium text-foreground mb-2">
                    Upload Foto Produk
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Klik untuk pilih file JPG atau PNG
                  </p>
                </div>
              </label>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden max-w-md mx-auto shadow-glow">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-auto"
                  />
                </div>
                <div className="flex gap-3 justify-center">
                  <label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button variant="outline" size="sm" asChild>
                      <span>Ganti Foto</span>
                    </Button>
                  </label>
                  <Button
                    onClick={generateCaptions}
                    disabled={isGenerating}
                    className="bg-gradient-warm hover:opacity-90 transition-opacity shadow-glow"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Generate Captions
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Captions Results */}
        {captions.length > 0 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-1 w-12 bg-gradient-warm rounded-full" />
              <h2 className="text-xl font-bold text-foreground">
                10 Variasi Caption Siap Pakai
              </h2>
            </div>
            
            <div className="grid gap-4">
              {captions.map((caption, index) => (
                <Card
                  key={index}
                  className="p-5 shadow-card hover:shadow-glow transition-all duration-300 border-border/50 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-warm text-xs font-medium text-white">
                        {caption.tone}
                      </div>
                      <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                        {caption.text}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(caption.text, index)}
                      className="flex-shrink-0 hover:bg-muted group-hover:bg-gradient-warm group-hover:text-white transition-all"
                    >
                      {copiedIndex === index ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
