"use client";

import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { FileText, Layout, Hash, Type } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePageContent } from "../../hooks/use-page-content";
import WelcomeDialog from "./welcome-dialog";
import { Page, pageIcons, pages, sectionIcons } from "./data.lib";

interface User {
  name: string;
  role: "admin" | "owner";
}

interface PageSelectionProps {
  pages: Record<string, Page>;
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
        {(keys ?? []).map((k) => {
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
        value={value ?? ""}
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

  useEffect(() => {
    if (page) {
      setSectionsForPage(Object.keys(pages[page as keyof typeof pages]));
      setSection("");
      setKey("");
      setKeysForSection([]);
    }
  }, [page]);

  useEffect(() => {
    if (section) {
      setKeysForSection(pages[page as keyof typeof pages][section] as string[]);
      setKey("");
    }
  }, [page, section]);

  useEffect(() => {
    if (!key) {
      setValue("");
      return;
    }

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
