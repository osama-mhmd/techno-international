import defaultContent from "../config/default-content";

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
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const url = `${BACKEND_URL}/pages/${page}`;
  const res = await fetch(url);

  if (!res.ok) {
    const errorBody = await res.text();
    console.log(
      `Failed to fetch content for page "${page}". Status: ${res.status}. Body: ${errorBody}`
    );
  }

  // @ts-expect-error TODO: Need to enhance the type safety here
  let readableContent = defaultContent[page];

  if (res.ok) {
    const unreadableContent: ContentItem[] = await res.json();

    readableContent =
      transformToReadableContent(unreadableContent)[page]! ?? {};
  }

  return (section: string, key?: string) => {
    const sectionData =
      // @ts-expect-error TODO: Need to enhance the type safety here
      readableContent[section] ?? defaultContent[page][section];

    if (!sectionData) return null;

    if (key === undefined) return sectionData;

    // @ts-expect-error TODO: Need to enhance the type safety here
    const value = sectionData[key] ?? defaultContent[page][section][key];

    if (value === undefined) return null;

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
