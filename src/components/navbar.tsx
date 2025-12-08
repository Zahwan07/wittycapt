import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 bg-background/60 shadow-sm backdrop-blur-x1 w-full border-b border-border/50 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gradient-warm shadow-glow">
            <img 
            src="/YesCapt.svg"
            alt="Logo" 
            className="h-5 w-5" />
            </div>

          <span className="text-xl font-semibold bg-gradient-warm bg-clip-text text-transparent">
            Wittycapt
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6 font-medium">
          <Link to="/" className="hover:text-primary transition">Generate</Link>
          <Link to="/home" className="hover:text-primary transition">Home</Link>
          <Link to="/about" className="hover:text-primary transition">About Us</Link>
          <Link to="/contact" className="hover:text-primary transition">Contact</Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
