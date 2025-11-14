"use client";

import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import {
  FileText,
  Users,
  Home,
  Layout,
  Search,
  Calendar,
  Menu,
  Hash,
  Type,
  Sparkles,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { usePageContent } from "../../hooks/use-page-content";

interface User {
  name: string;
  role: "admin" | "owner";
}

// Pages and their sections
const pages: Record<string, string[]> = {
  landing: ["landing_view", "define_techno", "services", "search", "events"],
  about_us: ["team", "mission", "history", "header", "footer"],
} as const;

// Sections and their keys
const sectionsKeys: Record<string, string[]> = {
  landing_view: ["heading", "description", "button_text"],
  define_techno: ["heading", "description"],
  services: [
    "service_1_heading",
    "service_1_description",
    "service_2_heading",
    "service_2_description",
    "service_3_heading",
    "service_3_description",
  ],
  search: ["placeholder", "button_text"],
  events: ["event_1", "event_2", "event_3"],
  footer: ["footer_text", "footer_links"],
  header: ["title", "menu_1", "menu_2"],
  team: ["team_heading", "team_description"],
  mission: ["mission_heading", "mission_description"],
  history: ["history_heading", "history_description"],
};

const pageIcons: Record<string, typeof Home> = {
  landing: Home,
  about_us: Users,
};

const sectionIcons: Record<string, typeof Home> = {
  landing_view: Layout,
  define_techno: FileText,
  services: Layout,
  search: Search,
  events: Calendar,
  footer: Layout,
  header: Menu,
  team: Users,
  mission: FileText,
  history: FileText,
};

// Welcome Dialog Component
interface WelcomeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

function WelcomeDialog({ isOpen, onClose, userName }: WelcomeDialogProps) {
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

// Page Selection Component
interface PageSelectionProps {
  pages: Record<string, string[]>;
  selectedPage: string;
  onSelectPage: (page: string) => void;
}

function PageSelection({
  pages,
  selectedPage,
  onSelectPage,
}: PageSelectionProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5" />
        Select Page
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(pages).map((p) => {
          const Icon = pageIcons[p]!;
          const isSelected = selectedPage === p;
          return (
            <button
              key={p}
              onClick={() => onSelectPage(p)}
              className={`relative p-6 rounded-xl transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-linear-to-br from-gray-500 to-secondary shadow-lg"
                  : "bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-lg ${isSelected ? "bg-white/20" : "bg-purple-500/20"}`}
                >
                  <Icon
                    className={`w-6 h-6 ${isSelected ? "text-white" : "text-purple-300"}`}
                  />
                </div>
                <div className="text-left">
                  <h3
                    className={`font-semibold ${isSelected ? "text-white" : "text-gray-200"}`}
                  >
                    {p.replace("_", " ").toUpperCase()}
                  </h3>
                  <p
                    className={`text-sm ${isSelected ? "text-purple-100" : "text-gray-400"}`}
                  >
                    {pages[p]!.length} sections
                  </p>
                </div>
              </div>
              {isSelected && (
                <div className="absolute top-3 right-3 w-3 h-3 bg-white rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Section Selection Component
interface SectionSelectionProps {
  sections: string[];
  selectedSection: string;
  onSelectSection: (section: string) => void;
}

function SectionSelection({
  sections,
  selectedSection,
  onSelectSection,
}: SectionSelectionProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <Layout className="w-5 h-5" />
        Select Section
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {sections.map((sec) => {
          const Icon = sectionIcons[sec] || Layout;
          const isSelected = selectedSection === sec;
          return (
            <button
              key={sec}
              onClick={() => onSelectSection(sec)}
              className={`p-4 rounded-lg transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-linear-to-br from-gray-500 to-secondary/80"
                  : "bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-5 h-5 ${isSelected ? "text-white" : "text-blue-300"}`}
                />
                <span
                  className={`text-sm font-medium ${isSelected ? "text-white" : "text-gray-200"}`}
                >
                  {sec.replace("_", " ").toUpperCase()}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Key Selection Component
interface KeySelectionProps {
  keys: string[];
  selectedKey: string;
  onSelectKey: (key: string) => void;
}

function KeySelection({ keys, selectedKey, onSelectKey }: KeySelectionProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <Hash className="w-5 h-5" />
        Select Key
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {keys.map((k) => {
          const isSelected = selectedKey === k;
          return (
            <button
              key={k}
              onClick={() => onSelectKey(k)}
              className={`p-4 rounded-lg transition-all duration-200 text-left cursor-pointer ${
                isSelected
                  ? "bg-linear-to-br from-gray-500 to-secondary/60 shadow-lg"
                  : "bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20"
              }`}
            >
              <div className="flex items-center gap-3">
                <Type
                  className={`w-4 h-4 ${isSelected ? "text-white" : "text-emerald-300"}`}
                />
                <span
                  className={`text-sm font-medium ${isSelected ? "text-white" : "text-gray-200"}`}
                >
                  {k.replace("_", " ").toUpperCase()}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Value Input Component
interface ValueInputProps {
  value: string;
  onChange: (value: string) => void;
}

function ValueInput({ value, onChange }: ValueInputProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-semibold text-white mb-4">Enter Value</h2>
      <textarea
        placeholder="Enter your content here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white/10 border-transparent focus:border-white/50 text-white placeholder:text-gray-400 px-4 py-3 rounded-md focus:outline-0 border-b-2 transition w-full text-lg"
        rows={4}
      />
      <p className="text-muted mt-2">Fill in the value to save the changes</p>
    </div>
  );
}

// Save Button Component
interface SaveButtonProps {
  onClick: () => void;
}

function SaveButton({ onClick }: SaveButtonProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex justify-center pt-4">
      <Button
        onClick={onClick}
        className="bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-200"
      >
        Save Changes
      </Button>
    </div>
  );
}

// Main Component
export default function PanelContentEditor() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [showWelcome, setShowWelcome] = useState(false);

  const [page, setPage] = useState<string>("");
  const { content } = usePageContent(page);
  const [section, setSection] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [value, setValue] = useState<string>("");

  const [sectionsForPage, setSectionsForPage] = useState<string[]>([]);
  const [keysForSection, setKeysForSection] = useState<string[]>([]);

  const router = useRouter();

  // Load user
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(async (res) => {
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);

        // Check if welcome dialog should be shown
        const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
        if (!hasSeenWelcome) {
          setShowWelcome(true);
        }
      } else {
        router.push("/panel/login");
      }
    });
  }, [router]);

  // Update sections when page changes
  useEffect(() => {
    if (page) {
      setSectionsForPage(pages[page] as string[]);
      setSection("");
      setKey("");
      setKeysForSection([]);
    }
  }, [page]);

  // Update keys when section changes
  useEffect(() => {
    if (section) {
      setKeysForSection(sectionsKeys[section] as string[]);
      setKey("");
    }
  }, [section]);

  useEffect(() => {
    if (!key) return;

    setValue(content(section, key));
  }, [section, key, content]);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem("hasSeenWelcome", "true");
  };

  const handleSave = async () => {
    if (!page || !section || !key || !value) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/pages/${page}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ section, key, value }),
        }
      );

      if (!res.ok) throw new Error("Failed to save");

      setPage("");
      setSection("");
      setKey("");
      setValue("");
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 to-secondary/10 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <WelcomeDialog
        isOpen={showWelcome}
        onClose={handleCloseWelcome}
        userName={user.name}
      />

      <main className="min-h-screen py-44 bg-linear-to-br from-slate-900 to-secondary/20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-2">
              Content Editor
            </h1>
            <p className="text-muted">Manage your page content with ease</p>
          </div>

          <div className="space-y-8">
            <PageSelection
              pages={pages}
              selectedPage={page}
              onSelectPage={setPage}
            />

            {page && (
              <SectionSelection
                sections={sectionsForPage}
                selectedSection={section}
                onSelectSection={setSection}
              />
            )}

            {section && (
              <KeySelection
                keys={keysForSection}
                selectedKey={key}
                onSelectKey={setKey}
              />
            )}

            {key && <ValueInput value={value} onChange={setValue} />}

            {value && <SaveButton onClick={handleSave} />}
          </div>
        </div>
      </main>
    </>
  );
}
