import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Sparkles, Copy, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "../components/navbar";


interface Caption {
  rank: number;
  tone: string;
  text: string;
  recommended: boolean;
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

        // Handle network / function level errors
        if (error) {
          const anyError: any = error as any;
          const msg: string = anyError?.message || "Terjadi kesalahan";
          const status: number | undefined = anyError?.status;
          setIsGenerating(false);

          if (status === 429 || msg.includes("429") || msg.toLowerCase().includes("rate limit")) {
            toast.error(
              "Server lagi ramai banget. Coba lagi dalam beberapa detik ya, atau kirim foto lain dulu."
            );
            return;
          }

          if (status === 402 || msg.includes("402") || msg.toLowerCase().includes("payment")) {
            toast.error("Batas penggunaan AI sudah tercapai. Silakan upgrade paket untuk lanjut.");
            return;
          }

          console.error("Supabase function error:", error);
          toast.error("Gagal generate caption. Coba lagi sebentar lagi ya!");
          return;
        }

        // Handle soft error payloads returned as 200
        if (data && (data as any).status === 429) {
          toast.error(
            "Server AI lagi penuh. Tunggu sebentar lalu klik lagi tombol Generate, ya 🙏"
          );
          setIsGenerating(false);
          return;
        }

        if (data && (data as any).status === 402) {
          toast.error("Batas pemakaian AI sudah habis. Upgrade akun untuk pakai lebih banyak.");
          setIsGenerating(false);
          return;
        }

        if (!data || !(data as any).captions) {
          console.error("Unexpected AI response:", data);
          toast.error("AI tidak mengirim caption. Coba ulangi sekali lagi.");
          setIsGenerating(false);
          return;
        }

        // Sort captions by rank
        const sortedCaptions = ((data as any).captions as Caption[]).sort((a, b) => a.rank - b.rank);
        setCaptions(sortedCaptions);
        toast.success("Caption berhasil dibuat! ✨");
        setIsGenerating(false);
      };
      reader.readAsDataURL(image);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan tak terduga. Coba lagi nanti ya.");
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success("Caption disalin!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };



  const recommendedCaptions = captions.filter(c => c.recommended);
  const otherCaptions = captions.filter(c => !c.recommended);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">

      <Navbar />

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Upload Section */}
        <Card className="p-5 mb-8 shadow-card border-border/50 bg-gradient-hero">
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
                    className="bg-gradient-warm hover:opacity-70 transition-opacity shadow-glow"
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

        {/* Top 3 Recommended Captions */}
        {recommendedCaptions.length > 0 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 mb-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-foreground mb-2">
                🏆 Rekomendasi Caption 3 Teratas
              </h2>
              <p className="text-sm text-muted-foreground">Caption terbaik berdasarkan analisis AI</p>
            </div>

            <div className="space-y-3">
              {recommendedCaptions.map((caption, index) => (
                <Card
                  key={index}
                  className="p-4 shadow-card hover:shadow-glow transition-all duration-300 border-2 border-primary/30 bg-gradient-to-r from-primary/5 to-transparent group"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-warm text-white flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                          {caption.tone}
                        </span>
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

        {/* Other Captions */}
        {otherCaptions.length > 0 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-muted-foreground">
                Opsi Caption Lainnya
              </h2>
            </div>

            <div className="space-y-3">
              {otherCaptions.map((caption, index) => (
                <Card
                  key={index + recommendedCaptions.length}
                  className="p-4 shadow-card hover:shadow-glow transition-all duration-300 border-border/50 group"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-medium text-sm">
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                          {caption.tone}
                        </span>
                      </div>
                      <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                        {caption.text}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(caption.text, index + recommendedCaptions.length)}
                      className="flex-shrink-0 hover:bg-muted group-hover:bg-gradient-warm group-hover:text-white transition-all"
                    >
                      {copiedIndex === index + recommendedCaptions.length ? (
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
