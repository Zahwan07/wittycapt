import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Navbar from "@/components/navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40">
        <Navbar />
      {/* Section Hero */}
      <section className="text-center py-24 px-6 justify-center items-center bg-no-repeat bg-left bg-contain">
    
    <img
    src="/womanbg.svg"
    className="absolute left-2500 top-1/2 -translate-y-1/2 w-[300px] opacity-100 pointer-events-none"
    alt=""/>

    <div className="p-2 rounded-xl">
    <img 
      src="/YesCapt.svg"
      alt="Logo" 
      className="w-32 mx-auto"/>
    </div>

  <h1 className="text-4xl md:text-5xl font-bold mb-5 bg-gradient-warm bg-clip-text text-transparent inline-block leading-[1.3] pt-1 pb-2 overflow-visible">
    Selamat Datang di WittyCapt!
  </h1>

  <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-lg bg-none">
    Buat caption otomatis hanya dari foto produk. Cepat, mudah, dan hasilnya estetik ✨
  </p>

  <div className="flex gap-4 justify-center">
    <Button asChild size="lg" className="bg-gradient-warm shadow-glow hover:opacity-80">
      <Link to="/">Mulai Generate Caption</Link>
    </Button>

    <Button asChild variant="outline" size="lg">
      <Link to="/about">Tentang Kami</Link>
    </Button>
  </div>
</section>


      {/* Section Fitur */}
      <section className="px-6 py-16 max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        <div className="p-6 rounded-xl border bg-card shadow-md">
          <h3 className="font-semibold mb-2">🔥 1 Klik Generate</h3>
          <p className="text-sm text-muted-foreground">
            Upload foto → klik tombol → langsung keluar 10 variasi caption.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-card shadow-md">
          <h3 className="font-semibold mb-2">🎨 Tone Variatif</h3>
          <p className="text-sm text-muted-foreground">
            Caption dibuat dengan tone santai, formal, estetik, hingga humoris.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-card shadow-md">
          <h3 className="font-semibold mb-2">⚡ Super Cepat</h3>
          <p className="text-sm text-muted-foreground">
            Powered by AI Supabase — waktu generate hanya beberapa detik.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
