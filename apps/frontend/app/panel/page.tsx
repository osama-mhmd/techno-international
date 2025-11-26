"use client";

import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  FileText,
  Layout,
  Hash,
  Type,
  Users,
  UserPlus,
  Trash2,
  Shield,
  User,
  X,
  Crown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { usePageContent } from "../../hooks/use-page-content";
import WelcomeDialog from "./welcome-dialog";
import { Page, pageIcons, pages, sectionIcons } from "./data.lib";
import { isValidEmail, isValidPassword } from "../../lib/is-valid";

interface User {
  name: string;
  role: "admin" | "owner";
}

interface Admin {
  id: string;
  name: string;
  email: string;
  role: "admin" | "owner";
}

// Back Button Component
interface BackButtonProps {
  onClick: () => void;
}

function BackButton({ onClick }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-white hover:text-purple-300 transition-colors mb-6 cursor-pointer"
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="font-medium">Back to Content Editor</span>
    </button>
  );
}

// Admin Card Component
interface AdminCardProps {
  admin: Admin;
  currentUser: User;
  onDelete: (id: string) => void;
}

function AdminCard({ admin, currentUser, onDelete }: AdminCardProps) {
  const Icon = admin.role === "owner" ? Crown : Shield;
  const isOwner = currentUser.role === "owner";

  return (
    <div className="relative p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-200 hover:bg-white/15">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-purple-500/20">
            <Icon className="w-5 h-5 text-purple-300" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{admin.name}</h3>
            <p className="text-sm text-gray-400">{admin.email}</p>
            <span
              className={`text-xs px-2 py-1 rounded mt-1 inline-block ${
                admin.role === "owner"
                  ? "bg-yellow-500/20 text-yellow-300"
                  : "bg-blue-500/20 text-blue-300"
              }`}
            >
              {admin.role.toUpperCase()}
            </span>
          </div>
        </div>
        {isOwner && admin.role !== "owner" && (
          <button
            onClick={() => onDelete(admin.id)}
            className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors cursor-pointer"
          >
            <Trash2 className="w-5 h-5 text-red-300" />
          </button>
        )}
      </div>
    </div>
  );
}

// Admin List Component
interface AdminListProps {
  admins: Admin[];
  currentUser: User;
  onDelete: (id: string) => void;
}

function AdminList({ admins, currentUser, onDelete }: AdminListProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <Users className="w-5 h-5" />
        Current Administrators
      </h2>
      <div className="grid grid-cols-1 gap-3">
        {admins.map((admin) => (
          <AdminCard
            key={admin.id}
            admin={admin}
            currentUser={currentUser}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

// Add Admin Form Input Component
interface FormInputProps {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

function FormInput({
  type = "text",
  placeholder,
  value,
  onChange,
}: FormInputProps) {
  return (
    <div>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 w-full"
      />
    </div>
  );
}

// Add Admin Form Component
interface AddAdminFormProps {
  onAdd: (name: string, email: string, password: string) => void;
  isOwner: boolean;
}

function AddAdminForm({ onAdd, isOwner }: AddAdminFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = () => {
    if (!name || !email || !password) return;
    onAdd(name, email, password);
    setName("");
    setEmail("");
    setPassword("");
    setShowForm(false);
  };

  if (!isOwner) {
    return (
      <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
        <div className="flex items-center gap-3 text-gray-400">
          <Shield className="w-5 h-5" />
          <p>Only owners can add new administrators</p>
        </div>
      </div>
    );
  }

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="w-full p-6 rounded-xl bg-linear-to-br from-gray-500 to-secondary/50 shadow-lg transition-all duration-200 cursor-pointer"
      >
        <div className="flex items-center justify-center gap-3">
          <UserPlus className="w-6 h-6 text-white" />
          <span className="text-lg font-semibold text-white">
            Add New Administrator
          </span>
        </div>
      </button>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            New Administrator
          </h3>
          <button
            onClick={() => setShowForm(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          <FormInput
            label="Name"
            placeholder="Enter admin name"
            value={name}
            onChange={setName}
          />

          <FormInput
            label="Email"
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={setEmail}
          />

          <FormInput
            label="Password"
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={setPassword}
          />

          <Button
            onClick={handleSubmit}
            disabled={
              !name ||
              !email ||
              !password ||
              !isValidEmail(email) ||
              !isValidPassword(password)
            }
            className="mt-4 w-full bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-lg transition-all duration-200"
          >
            Add Administrator
          </Button>
        </div>
      </div>
    </div>
  );
}

// Empty State Component
interface EmptyStateProps {
  icon: React.ComponentType<{ className?: string }>;
  message: string;
}

function EmptyState({ icon: Icon, message }: EmptyStateProps) {
  return (
    <div className="p-12 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
      <Icon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <p className="text-gray-400 text-lg">{message}</p>
    </div>
  );
}

// Delete Confirmation Dialog Component
interface DeleteConfirmDialogProps {
  isOpen: boolean;
  adminName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function DeleteConfirmDialog({
  isOpen,
  adminName,
  onConfirm,
  onCancel,
}: DeleteConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative bg-linear-to-br from-slate-900 to-secondary/20 border border-white/20 rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in zoom-in-95 duration-300">
        <div className="flex flex-col items-center text-center">
          <div className="bg-red-500/20 p-4 rounded-full mb-6">
            <Trash2 className="w-8 h-8 text-red-400" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-3">
            Delete Administrator?
          </h2>

          <p className="text-muted text-base mb-6">
            Are you sure you want to delete <strong>{adminName}</strong>? This
            action cannot be undone.
          </p>

          <div className="flex gap-3 w-full">
            <Button
              onClick={onCancel}
              variant="outline"
              className="flex-1 rounded-md bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 rounded-md bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Page Selection Component
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
          console.log(pages[p]);
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
                    {Object.keys(pages[p] as object).length} sections
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

// Page Header Component
interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge?: {
    icon: React.ComponentType<{ className?: string }>;
    text: string;
  };
}

function PageHeader({ title, subtitle, badge }: PageHeaderProps) {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
      <p className="text-muted">{subtitle}</p>
      {badge && (
        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30">
          <badge.icon className="w-4 h-4 text-yellow-300" />
          <span className="text-sm text-yellow-300">{badge.text}</span>
        </div>
      )}
    </div>
  );
}

// Main Component
export default function PanelContentEditor() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAdminManagement, setShowAdminManagement] = useState(false);

  const [page, setPage] = useState<string>("");
  const { content } = usePageContent(page);
  const [section, setSection] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [value, setValue] = useState<string>("");

  const [sectionsForPage, setSectionsForPage] = useState<string[]>([]);
  const [keysForSection, setKeysForSection] = useState<string[]>([]);

  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loadingAdmins, setLoadingAdmins] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const router = useRouter();

  // Load user
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`, {
      credentials: "include",
    }).then(async (res) => {
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);

        const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
        if (!hasSeenWelcome) {
          setShowWelcome(true);
        }
      } else {
        router.push("/panel/login");
      }
    });
  }, [router]);

  // Load admins when showing admin management
  useEffect(() => {
    if (showAdminManagement && admins.length === 0) {
      setLoadingAdmins(true);
      const token = localStorage.getItem("token");

      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admins`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(async (res) => {
          if (res.ok) {
            const adminsData = await res.json();
            setAdmins(adminsData);
          }
        })
        .catch((err) => console.error("Failed to fetch admins:", err))
        .finally(() => setLoadingAdmins(false));
    }
  }, [showAdminManagement, admins.length]);

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

  const handleAddAdmin = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admins`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) throw new Error("Failed to add admin");

      const newAdmin = await res.json();
      console.log(newAdmin);
      setAdmins([...admins, newAdmin]);
    } catch (err) {
      console.error("Failed to add admin:", err);
    }
  };

  const handleDeleteAdmin = (id: string) => {
    const admin = admins.find((a) => a.id === id);
    if (admin) {
      setDeleteConfirm({ id, name: admin.name });
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admins/${deleteConfirm.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to delete admin");

      setAdmins(admins.filter((a) => a.id !== deleteConfirm.id));
      setDeleteConfirm(null);
    } catch (err) {
      console.error("Failed to delete admin:", err);
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

      <DeleteConfirmDialog
        isOpen={!!deleteConfirm}
        adminName={deleteConfirm?.name || ""}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirm(null)}
      />

      <main className="min-h-screen py-44 bg-linear-to-br from-slate-900 to-secondary/20 px-4">
        <div
          className={
            showAdminManagement ? "max-w-4xl mx-auto" : "max-w-5xl mx-auto"
          }
        >
          {showAdminManagement ? (
            <>
              <BackButton onClick={() => setShowAdminManagement(false)} />
              <PageHeader
                title="Admin Management"
                subtitle="Manage administrators and their permissions"
                badge={
                  user.role === "owner"
                    ? { icon: Crown, text: "Owner Access" }
                    : undefined
                }
              />

              <div className="space-y-8">
                <AddAdminForm
                  onAdd={handleAddAdmin}
                  isOwner={user.role === "owner"}
                />

                {loadingAdmins ? (
                  <div className="text-center text-white">
                    Loading admins...
                  </div>
                ) : admins.length > 0 ? (
                  <AdminList
                    admins={admins}
                    currentUser={user}
                    onDelete={handleDeleteAdmin}
                  />
                ) : (
                  <EmptyState icon={User} message="No administrators found" />
                )}
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowAdminManagement(true)}
                className="flex w-full justify-end items-center gap-2 text-white hover:text-purple-300 transition-colors mb-6 cursor-pointer"
              >
                <span className="font-medium">Go for Admin Management</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <PageHeader
                title="Content Editor"
                subtitle="Manage your page content with ease"
              />

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
            </>
          )}
        </div>
      </main>
    </>
  );
}
