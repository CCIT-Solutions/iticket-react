import { fetchFormData } from "../fetchers";

export interface LoginPayload {
  payload: {
    email?: string;
    password?: string;
  };
  acceptLanguage?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: unknown;
  errors?: Record<string, string[]>;
}

// Validation helper
const validatePayload = (
  payload: LoginPayload["payload"]
): string[] => {
  const errors: string[] = [];

  // Email validation
  if (!payload.email?.trim()) {
    errors.push("Email is required");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) {
    errors.push("Invalid email format");
  }

  // Password validation
  if (!payload.password?.trim()) {
    errors.push("Password is required");
  } else if (payload.password.trim().length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  return errors;
};

export const login = async ({
  payload,
  acceptLanguage,
}: LoginPayload): Promise<LoginResponse> => {
  const validationErrors = validatePayload(payload);
  if (validationErrors.length > 0) {
    return {
      success: false,
      message: "Validation failed",
      errors: { validation: validationErrors },
    };
  }

  const formData = new FormData();
  
  // Add string fields if they have values - with null checks
  const stringFields = [
    "email",
    "password",
  ] as const;

  stringFields.forEach((field) => {
    const value = payload[field];
    if (value && typeof value === "string" && value.trim()) {
      formData.append(field, value.trim());
    }
  });

  // Check if we have any data to submit
  const formEntries = [...formData.entries()];
  if (formEntries.length === 0) {
    return {
      success: false,
      message: "No valid data to submit. Please fill in at least one field.",
    };
  }

  const response = await fetchFormData<unknown>({
    endpoint: "client/login",
    formData,
    acceptLanguage,
  });

  if (response && response.success) {
    return {
      success: true,
      message: response.message || "Logged in successfully",
      data: response.data,
    };
  }

  return {
    success: response.success,
    message: response?.message || "Login failed. Please try again.",
    errors: response?.errors,
  };
};
