import { Link } from "react-router-dom";
import { ArrowLeft, Cpu, Brain, Sparkles, Image, MessageSquare, Zap, Server, Code } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";

const Architecture = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/40">
            <Navbar />

            {/* Hero Section */}
            <section className="text-center py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-warm text-white text-sm font-medium mb-6">
                        <Brain className="h-4 w-4" />
                        AI Architecture
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-5 bg-gradient-warm bg-clip-text text-transparent inline-block leading-[1.3]">
                        Arsitektur AI WittyCapt
                    </h1>

                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8">
                        Memahami bagaimana AI kami menganalisis gambar produk dan menghasilkan caption yang menarik
                    </p>
                </div>
            </section>

            {/* AI Architecture Flow */}
            <section className="px-6 py-12 max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold mb-8 text-center">Flow Generasi Caption</h2>

                <div className="grid md:grid-cols-4 gap-4 mb-12">
                    <Card className="p-6 text-center border-2 border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
                        <div className="w-12 h-12 rounded-full bg-gradient-warm flex items-center justify-center mx-auto mb-4">
                            <Image className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-semibold mb-2">1. Upload Gambar</h3>
                        <p className="text-sm text-muted-foreground">
                            User upload foto produk (JPG/PNG)
                        </p>
                    </Card>

                    <Card className="p-6 text-center border-2 border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
                        <div className="w-12 h-12 rounded-full bg-gradient-warm flex items-center justify-center mx-auto mb-4">
                            <Code className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-semibold mb-2">2. Encode Base64</h3>
                        <p className="text-sm text-muted-foreground">
                            Gambar dikonversi ke format Base64
                        </p>
                    </Card>

                    <Card className="p-6 text-center border-2 border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
                        <div className="w-12 h-12 rounded-full bg-gradient-warm flex items-center justify-center mx-auto mb-4">
                            <Brain className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-semibold mb-2">3. AI Analysis</h3>
                        <p className="text-sm text-muted-foreground">
                            Gemini 2.5 Flash menganalisis gambar
                        </p>
                    </Card>

                    <Card className="p-6 text-center border-2 border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
                        <div className="w-12 h-12 rounded-full bg-gradient-warm flex items-center justify-center mx-auto mb-4">
                            <MessageSquare className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-semibold mb-2">4. Caption Output</h3>
                        <p className="text-sm text-muted-foreground">
                            5 caption terbaik dengan penjelasan
                        </p>
                    </Card>
                </div>
            </section>

            {/* AI Model Details */}
            <section className="px-6 py-12 max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold mb-8 text-center">Model AI yang Digunakan</h2>

                <Card className="p-8 bg-gradient-to-br from-card to-muted/20 border-2 border-primary/20">
                    <div className="flex items-start gap-6">
                        <div className="p-4 rounded-2xl bg-gradient-warm shadow-glow">
                            <Sparkles className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-2">Google Gemini 2.5 Flash</h3>
                            <p className="text-muted-foreground mb-4">
                                Model AI multimodal terbaru dari Google dengan kemampuan vision dan text generation yang canggih.
                            </p>

                            <div className="grid md:grid-cols-2 gap-4 mt-6">
                                <div className="p-4 rounded-lg bg-background/50">
                                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                                        <Zap className="h-4 w-4 text-primary" />
                                        Vision Capability
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        Mampu menganalisis gambar dengan detail tinggi: mengenali objek, warna, style, mood, dan konteks produk.
                                    </p>
                                </div>

                                <div className="p-4 rounded-lg bg-background/50">
                                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                                        <MessageSquare className="h-4 w-4 text-primary" />
                                        Text Generation
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        Menghasilkan caption dalam Bahasa Indonesia yang natural, engaging, dan sesuai dengan berbagai tone.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </section>

            {/* Prompt Engineering */}
            <section className="px-6 py-12 max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold mb-8 text-center">Prompt Engineering</h2>

                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-6 border-l-4 border-l-primary">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <Cpu className="h-5 w-5 text-primary" />
                            System Prompt
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            AI diprogram sebagai "copywriter expert untuk UMKM Indonesia" yang memahami:
                        </p>
                        <ul className="text-sm space-y-2 text-muted-foreground">
                            <li>• Analisis visual produk (jenis, warna, mood, style)</li>
                            <li>• Berbagai tone copywriting (Hard-selling, Soft-selling, Gen Z, dll)</li>
                            <li>• CTA yang sesuai konteks Indonesia (DM, WhatsApp, COD)</li>
                            <li>• Bahasa Indonesia yang natural dan engaging</li>
                        </ul>
                    </Card>

                    <Card className="p-6 border-l-4 border-l-secondary">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <Brain className="h-5 w-5 text-secondary" />
                            Caption Ranking Logic
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            AI mengevaluasi setiap caption berdasarkan:
                        </p>
                        <ul className="text-sm space-y-2 text-muted-foreground">
                            <li>• <strong>Relevansi:</strong> Seberapa sesuai dengan produk</li>
                            <li>• <strong>Engagement:</strong> Potensi menarik perhatian</li>
                            <li>• <strong>Clarity:</strong> Kejelasan pesan</li>
                            <li>• <strong>Uniqueness:</strong> Keunikan pendekatan</li>
                            <li>• <strong>CTA Effectiveness:</strong> Kekuatan call-to-action</li>
                        </ul>
                    </Card>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="px-6 py-12 max-w-5xl mx-auto mb-12">
                <h2 className="text-2xl font-bold mb-8 text-center">Tech Stack</h2>

                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-blue-500/10">
                                <Code className="h-5 w-5 text-blue-500" />
                            </div>
                            <h3 className="font-semibold">Frontend</h3>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• React + TypeScript</li>
                            <li>• Vite (Build Tool)</li>
                            <li>• Tailwind CSS</li>
                            <li>• shadcn/ui Components</li>
                        </ul>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-green-500/10">
                                <Server className="h-5 w-5 text-green-500" />
                            </div>
                            <h3 className="font-semibold">Backend</h3>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Supabase Edge Functions</li>
                            <li>• Deno Runtime</li>
                            <li>• Lovable AI Gateway</li>
                            <li>• CORS Support</li>
                        </ul>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-purple-500/10">
                                <Brain className="h-5 w-5 text-purple-500" />
                            </div>
                            <h3 className="font-semibold">AI</h3>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Google Gemini 2.5 Flash</li>
                            <li>• Multimodal (Vision + Text)</li>
                            <li>• JSON Output Parsing</li>
                            <li>• Rate Limit Handling</li>
                        </ul>
                    </Card>
                </div>
            </section>

            {/* Back to Generate */}
            <section className="px-6 py-12 text-center">
                <Button asChild size="lg" className="bg-gradient-warm shadow-glow hover:opacity-80">
                    <Link to="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali ke Generate Caption
                    </Link>
                </Button>
            </section>
        </div>
    );
};

export default Architecture;
