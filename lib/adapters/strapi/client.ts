/**

 * Minimal Strapi REST client for Next server-side adapters.

 * Env only — no Strapi SDK. Never import this from UI pages.

 */



export type StrapiClientConfig = {

  baseUrl: string;

  apiToken?: string;

};



function trimSlash(url: string): string {

  return url.replace(/\/+$/, "");

}



export function resolveStrapiConfig(

  env: NodeJS.ProcessEnv = process.env,

): StrapiClientConfig {

  const baseUrl =

    env.STRAPI_URL?.trim() ||

    env.NEXT_PUBLIC_STRAPI_URL?.trim() ||

    "http://localhost:1337";

  const apiToken = env.STRAPI_API_TOKEN?.trim() || undefined;

  return { baseUrl: trimSlash(baseUrl), apiToken };

}



export type StrapiQuery = Record<

  string,

  string | number | boolean | undefined | null

>;



function buildQuery(params: StrapiQuery): string {

  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {

    if (value === undefined || value === null || value === "") continue;

    search.set(key, String(value));

  }

  const qs = search.toString();

  return qs ? `?${qs}` : "";

}



export async function strapiFetchJson<T>(

  path: string,

  config: StrapiClientConfig,

  query: StrapiQuery = {},

): Promise<T | null> {

  const url = `${config.baseUrl}${path.startsWith("/") ? path : `/${path}`}${buildQuery(query)}`;

  const headers: HeadersInit = {

    Accept: "application/json",

  };

  if (config.apiToken) {

    headers.Authorization = `Bearer ${config.apiToken}`;

  }



  let response: Response;

  try {

    response = await fetch(url, {

      headers,

      // Server components / adapters: always fresh published content

      cache: "no-store",

    });

  } catch {

    return null;

  }



  if (response.status === 404) return null;

  if (!response.ok) return null;



  return (await response.json()) as T;

}



/**

 * POST/PUT JSON to Strapi (server-side only).

 * Requires API token for write operations; returns null on failure.

 */

export async function strapiMutateJson<T>(

  path: string,

  config: StrapiClientConfig,

  body: unknown,

  options: { method?: "POST" | "PUT" | "DELETE"; query?: StrapiQuery } = {},

): Promise<T | null> {

  if (!config.apiToken) return null;



  const method = options.method ?? "POST";

  const query = options.query ?? {};

  const url = `${config.baseUrl}${path.startsWith("/") ? path : `/${path}`}${buildQuery(query)}`;

  const headers: HeadersInit = {

    Accept: "application/json",

    "Content-Type": "application/json",

    Authorization: `Bearer ${config.apiToken}`,

  };



  let response: Response;

  try {

    response = await fetch(url, {

      method,

      headers,

      body: method === "DELETE" ? undefined : JSON.stringify(body),

      cache: "no-store",

    });

  } catch {

    return null;

  }



  if (!response.ok) return null;

  if (response.status === 204) return {} as T;



  return (await response.json()) as T;

}



/** Absolute media URL when Strapi returns a relative `/uploads/...` path. */

export function absolutizeMediaUrl(

  url: string | undefined | null,

  baseUrl: string,

): string | undefined {

  if (!url) return undefined;

  if (/^https?:\/\//i.test(url)) return url;

  return `${trimSlash(baseUrl)}${url.startsWith("/") ? url : `/${url}`}`;

}



export type StrapiAuthRequestResult<T> = {

  ok: true;

  data: T;

  status: number;

} | {

  ok: false;

  status: number;

  message: string;

};



/**

 * Auth / user requests (register, login, me, update).

 * Uses optional Bearer user JWT — not the CMS API token.

 */

export async function strapiAuthRequest<T>(

  path: string,

  config: StrapiClientConfig,

  options: {

    method?: "GET" | "POST" | "PUT" | "DELETE";

    body?: unknown;

    accessToken?: string | null;

  } = {},

): Promise<StrapiAuthRequestResult<T>> {

  const method = options.method ?? "GET";

  const url = `${config.baseUrl}${path.startsWith("/") ? path : `/${path}`}`;

  const headers: HeadersInit = {

    Accept: "application/json",

  };

  if (options.body !== undefined) {

    headers["Content-Type"] = "application/json";

  }

  if (options.accessToken) {

    headers.Authorization = `Bearer ${options.accessToken}`;

  }



  let response: Response;

  try {

    response = await fetch(url, {

      method,

      headers,

      body:

        options.body === undefined ? undefined : JSON.stringify(options.body),

      cache: "no-store",

    });

  } catch {

    return { ok: false, status: 0, message: "Strapi unreachable" };

  }



  if (response.status === 204) {

    return { ok: true, data: {} as T, status: 204 };

  }



  let payload: unknown = null;

  try {

    payload = await response.json();

  } catch {

    payload = null;

  }



  if (!response.ok) {

    const message = extractStrapiErrorMessage(payload) || `HTTP ${response.status}`;

    return { ok: false, status: response.status, message };

  }



  return { ok: true, data: payload as T, status: response.status };

}



function extractStrapiErrorMessage(payload: unknown): string | null {

  if (!payload || typeof payload !== "object") return null;

  const error = (payload as { error?: { message?: string } }).error;

  if (error?.message) return error.message;

  const message = (payload as { message?: string | Array<{ messages?: Array<{ message?: string }> }> }).message;

  if (typeof message === "string") return message;

  if (Array.isArray(message)) {

    const nested = message[0]?.messages?.[0]?.message;

    if (nested) return nested;

  }

  return null;

}


