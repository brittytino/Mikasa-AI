import { Twitter, Github } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-mikasa-black py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-white mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Mikasa AI</h3>
            <p className="text-gray-400">The Future of AI Trading</p>
          </div>
          <div className="flex gap-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400">
          <p>&copy; 2024 Mikasa AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};