import { FileText, Sparkles, X } from "lucide-react";
import { Button } from "../../components/ui/button";

interface WelcomeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

export default function WelcomeDialog({
  isOpen,
  onClose,
  userName,
}: WelcomeDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative bg-linear-to-br from-slate-900 to-secondary/20 border border-white/20 rounded-2xl shadow-2xl max-w-lg w-full p-8 animate-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="bg-linear-to-br from-purple-500 to-pink-500 p-4 rounded-full mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-3xl font-bold text-white mb-3">
            Welcome, {userName}!
          </h2>

          <p className="text-muted text-lg mb-6">
            Get started with the Content Editor to manage your website content
            effortlessly. Select a page, section, and key to edit your content.
          </p>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 mb-6 w-full text-left">
            <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Important Note:
            </h3>
            <p className="text-muted text-sm space-y-1">
              All the {'"keys"'} have default values, so in case you didn{"'"}t
              change them from the panel, they will have the default values
            </p>
          </div>

          <Button
            onClick={onClose}
            className="bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-base font-semibold rounded-xl transition-all duration-200 w-full"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
