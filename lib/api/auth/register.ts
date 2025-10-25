import { fetchFormData } from "../api";

export interface RegisterPayload {
  payload: {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
  };
  acceptLanguage?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data?: unknown;
  errors?: Record<string, string[]>;
}

// Validation helper
const validatePayload = (
  payload: RegisterPayload["payload"]
): string[] => {
  const errors: string[] = [];

  // Add your validation rules here
  if (!payload.name?.trim()) {
    errors.push("Name is required");
  }

  if (!payload.email?.trim()) {
    errors.push("Email is required");
  }

  if (payload.phone && !/^[\+]?[\d\s\-\(\)]+$/.test(payload.phone.trim())) {
    errors.push("Invalid phone number format");
  }

  return errors;
};

export const register = async ({
  payload,
  acceptLanguage,
}: RegisterPayload): Promise<RegisterResponse> => {
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
    "name",
    "email",
    "phone",
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
    endpoint: "client/register",
    formData,
    acceptLanguage,
  });

  if (response && response.success) {
    return {
      success: true,
      message: response.message || "Registered successfully",
      data: response.data,
    };
  }

  return {
    success: response.success,
    message: response?.message || "Registration failed. Please try again.",
    errors: response?.errors,
  };
};
