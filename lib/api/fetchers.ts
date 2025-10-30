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

interface fetchJsonDataProps {
  endpoint: FetchDataProps["endpoint"];
  method?: FetchDataProps["method"];
  body?: unknown;
  acceptLanguage?: string;
}

interface fetchFormDataProps {
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
export async function fetchJsonData<T>({
  endpoint,
  method = "GET",
  body,
  acceptLanguage,
}: fetchJsonDataProps): Promise<T> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) throw new Error("API URL is not configured");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (acceptLanguage) {
    headers["Accept-Language"] = acceptLanguage;
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (body && method !== "GET") {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${apiUrl}/${endpoint}`, options);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${endpoint}: ${response.status} ${response.statusText}`
    );
  }

  const apiResponse: ApiResponse<T> = await response.json();
  return apiResponse.data;
}

// For FormData requests
export async function fetchFormData<T>({
  endpoint,
  formData,
  acceptLanguage,
}: fetchFormDataProps) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) throw new Error("API URL is not configured");

  const options: RequestInit = {
    method: "POST",
    body: formData,
  };

  // Add Accept-Language header if provided
  if (acceptLanguage) {
    options.headers = {
      "Accept-Language": acceptLanguage,
    };
  }

  const response = await fetch(`${apiUrl}/${endpoint}`, options);

  const apiResponse: ApiResponse<T> = await response.json();
  return apiResponse;
}
