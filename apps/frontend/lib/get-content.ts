interface ContentItem {
  page: string;
  section: string;
  key: string;
  value: string;
}

interface ReadableContent {
  [page: string]: {
    [section: string]: {
      [key: string]: string;
    };
  };
}

export type GetContent = (section: string, key: string) => string;
export type GetSection = (
  section: string,
  key?: string
) => { [key: string]: string };

/**
 * Fetches page content, transforms it into a readable structure, and returns a function
 * to easily retrieve specific content values.
 *
 * @param page The identifier of the page content to fetch.
 * @returns A function (section, key) => value, or throws an error on failure.
 */
export default async function getContent(page: string) {
  // TODO: Enhance the type safety in this function
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:4000";

  const url = `${BACKEND_URL}/pages/${page}`;
  const res = await fetch(url);

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(
      `Failed to fetch content for page "${page}". Status: ${res.status}. Body: ${errorBody}`
    );
  }

  const unreadableContent: ContentItem[] = await res.json();

  const readableContent = transformToReadableContent(unreadableContent)[page]!;

  return (section: string, key?: string) => {
    const sectionData = readableContent[section];

    if (!sectionData) {
      console.warn(`Content for section "${section}" not found.`);
      return "";
    }

    if (key === undefined) {
      return sectionData;
    }

    const value = sectionData[key];

    if (value === undefined) {
      console.warn(`Content key "${key}" not found in section "${section}".`);
      return "";
    }

    return value;
  };
}

function transformToReadableContent(
  unreadableContent: ContentItem[]
): ReadableContent {
  const readableContent: ReadableContent = {};

  for (const item of unreadableContent) {
    const { page, section, key, value } = item;

    if (!readableContent[page]) {
      readableContent[page] = {};
    }

    if (!readableContent[page][section]) {
      readableContent[page][section] = {};
    }

    readableContent[page][section][key] = value;
  }

  return readableContent;
}
