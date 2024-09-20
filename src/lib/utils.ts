
export function absoluteUrl(path: string): string {
    if (typeof window !== "undefined") return path;
    if (process.env.NODE_ENV === "production") {
      return `${process.env.NEXT_PUBLIC_DOMAIN as string}${path}`;
    } else {
      return `http://localhost:${process.env.PORT ?? 3002}${path}`;
    }
  }