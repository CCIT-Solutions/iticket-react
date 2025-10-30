interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  errors: {
    [key:string]: string[]
  }
}

interface FetchOptions extends Omit<RequestInit, "method"> {
  acceptLanguage?: string;
}

type FetchDataProps = {
  endpoint: string;
  method?: "GET" | "POST";
  options?: FetchOptions;
};

interface FetchJsonDataProps {
  endpoint: FetchDataProps["endpoint"];
  method?: FetchDataProps["method"];
  body?: unknown;
  acceptLanguage?: string;
}

interface FetchFormDataProps {
  endpoint: string;
  formData: FormData;
  acceptLanguage?: string;
}

export async function fetchData<T>({
  endpoint,
  method = "GET",
  options = {},
}: FetchDataProps): Promise<T> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) throw new Error("API URL is not configured");

  const { acceptLanguage, ...restOptions } = options;

  const headers = new Headers(restOptions.headers);
  if (acceptLanguage) {
    headers.set("Accept-Language", acceptLanguage);
  }

  const response = await fetch(`${apiUrl}/${endpoint}`, {
    method,
    ...restOptions,
    headers,
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${endpoint}: ${response.status} ${response.statusText}`
    );
  }

  const apiResponse: ApiResponse<T> = await response.json();
  return apiResponse.data;
}

// For regular JSON requests
export async function fetchJsonData<T = unknown>({
  endpoint,
  method = "GET",
  body,
  acceptLanguage,
}: FetchJsonDataProps): Promise<ApiResponse<T>> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) throw new Error("API URL is not configured");

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (acceptLanguage) headers["Accept-Language"] = acceptLanguage;

  const response = await fetch(`${apiUrl}/${endpoint}`, {
    method,
    headers,
    body: body && method !== "GET" ? JSON.stringify(body) : undefined,
  });

  const json = await response.json();
  return json as ApiResponse<T>;
}

export async function fetchFormData<T = unknown>({
  endpoint,
  formData,
  acceptLanguage,
}: FetchFormDataProps): Promise<ApiResponse<T>> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) throw new Error("API URL is not configured");

  const headers: Record<string, string> = {};
  if (acceptLanguage) headers["Accept-Language"] = acceptLanguage;

  const response = await fetch(`${apiUrl}/${endpoint}`, {
    method: "POST",
    headers,
    body: formData,
  });

  const json = await response.json();
  return json as ApiResponse<T>;
}

