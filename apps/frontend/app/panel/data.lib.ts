import {
  FileText,
  Users,
  Home,
  Layout,
  Search,
  Calendar,
  Menu,
} from "lucide-react";
import defaultContent from "../../config/default-content";

export type Page = Record<string, string[]>;

function generatePage(obj: Record<string, Record<string, string>>): Page {
  const result: Page = {};
  for (const section in obj) {
    result[section] = Object.keys(obj[section] as object);
  }
  return result;
}

const landing: Page = generatePage(defaultContent.landing);
const about_us: Page = generatePage(defaultContent.about_us);

export const pages = {
  landing,
  about_us,
} as const;

export const pageIcons: Record<string, typeof Home> = {
  landing: Home,
  about_us: Users,
};

export const sectionIcons: Record<string, typeof Home> = {
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
