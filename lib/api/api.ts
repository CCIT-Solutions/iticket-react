
import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

// ------------------ Types ------------------
export interface ApiValidationErrors {
  [key: string]: string[];
}

export interface ApiErrorResponse {
  response?: {
    status?: number;
    data?: {
      message?: string;
      errors?: ApiValidationErrors;
    };
  };
  message?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface ApiRequestOptions<
  T = unknown,
  TFieldValues extends FieldValues = FieldValues
> {
  setError?: UseFormSetError<TFieldValues>;
  setLoading?: (loading: boolean) => void;
  setOpen?: (open: boolean) => void;
  onSuccess?: (response: ApiResponse<T>) => void;
  onValidationError?: (
    errors: ApiValidationErrors,
    setError?: UseFormSetError<TFieldValues>,
    error?: ApiErrorResponse
  ) => void;
  onError?: (err: ApiErrorResponse) => void;
  t?: (key: string) => string;
}




// ------------------ Helper ------------------

export const setServerErrors = <TFieldValues extends FieldValues>(
  errorResponse: unknown,
  setError: UseFormSetError<TFieldValues>,
  showToast = true
): boolean => {
  // Safely narrow type
  const possibleError = errorResponse as Partial<{
    message: string;
    errors: ApiValidationErrors;
  }>;

  const responseErrors =
    possibleError.errors && typeof possibleError.errors === "object"
      ? possibleError.errors
      : (errorResponse as ApiValidationErrors | undefined);

  const message = possibleError.message;

  if (
    responseErrors &&
    typeof responseErrors === "object" &&
    !Array.isArray(responseErrors)
  ) {
    let hasFieldErrors = false;

    Object.entries(responseErrors).forEach(([field, messages]) => {
      if (Array.isArray(messages) && messages.length > 0) {
        setError(field as Path<TFieldValues>, {
          type: "server",
          message: messages[0],
        });
        hasFieldErrors = true;
      }
    });

    if (hasFieldErrors) return true;
  }

  if (message && showToast) {
    toast.error(message);
    return false;
  }

  return false;
};


// ------------------ Main apiRequest ------------------
export const apiRequest = async <
  T = unknown,
  TFieldValues extends FieldValues = FieldValues
>(
  promise: Promise<ApiResponse<T>>,
  {
    setError,
    setLoading,
    setOpen,
    onSuccess,
    onValidationError,
    t,
  }: ApiRequestOptions<T, TFieldValues> = {}
): Promise<ApiResponse<T>> => {
  if (setLoading) setLoading(true);

  try {
    const res = await promise;

    if (setLoading) setLoading(false);
    if (onSuccess) onSuccess(res);
    if (setOpen) setOpen(false);

    // Optionally show success toast
    if (res.message) toast.success(res.message);

    return res;
  } catch (error: unknown) {
    const err = error as ApiErrorResponse;
    if (setLoading) setLoading(false);

    if (err?.response?.status === 422) {
      const responseErrors = err.response?.data?.errors || {};

      if (onValidationError) {
        onValidationError(responseErrors, setError, err);
      } else if (setError) {
        setServerErrors(responseErrors, setError);
      }
    } else {
      console.log(
        "error?.response?.data?.message",
        err?.response?.data?.message
      );

      toast.error(
        err?.response?.data?.message ||
          t?.("validation.toastError") ||
          "Something went wrong"
      );
    }

    throw err;
  }
};
