import { ApiResponse } from "@/types/ApiResponse";
import { toast } from "sonner";
import {
  IoCheckmark,
  IoClose,
  IoWarning,
  IoInformationCircle,
} from "react-icons/io5";
import { TFunction } from "i18next";

// Enhanced types for better toast control
export type ToastType = "success" | "error" | "warning" | "info" | "loading";

export interface NotifyOptions {
  type?: ToastType;
  title?: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  cancel?: {
    label: string;
    onClick: () => void;
  };
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center";
  dismissible?: boolean;
  id?: string;
}

export interface NotifyProps {
  res: ApiResponse;
  options?: Partial<NotifyOptions>;
  t?: TFunction<"translation", undefined>;
}

// Icon component mapping
const getIcon = (type: ToastType) => {
  const iconMap = {
    success: (
      <div className="flex items-center justify-center text-white bg-green-500 rounded-full size-5">
        <IoCheckmark className="size-3" />
      </div>
    ),
    error: (
      <div className="flex items-center justify-center text-white bg-red-500 rounded-full size-5">
        <IoClose className="size-3" />
      </div>
    ),
    warning: (
      <div className="flex items-center justify-center text-white bg-amber-500 rounded-full size-5">
        <IoWarning className="size-3" />
      </div>
    ),
    info: (
      <div className="flex items-center justify-center text-white bg-blue-500 rounded-full size-5">
        <IoInformationCircle className="size-3" />
      </div>
    ),
    loading: undefined, // Sonner handles loading spinner
  };

  return iconMap[type];
};

// Get theme classes based on toast type
const getThemeClasses = (type: ToastType) => {
  const themeMap = {
    success: {
      toast:
        "!border-green-200 !bg-green-50 dark:!bg-green-950 dark:!border-green-800",
      title: "!text-green-800 dark:!text-green-200",
      description: "!text-green-700 dark:!text-green-300",
      actionButton: "!bg-green-600 hover:!bg-green-700 !text-white",
      cancelButton:
        "!bg-green-100 hover:!bg-green-200 !text-green-800 dark:!bg-green-900 dark:!text-green-200",
    },
    error: {
      toast: "!border-red-200 !bg-red-50 dark:!bg-red-950 dark:!border-red-800",
      title: "!text-red-800 dark:!text-red-200",
      description: "!text-red-700 dark:!text-red-300",
      actionButton: "!bg-red-600 hover:!bg-red-700 !text-white",
      cancelButton:
        "!bg-red-100 hover:!bg-red-200 !text-red-800 dark:!bg-red-900 dark:!text-red-200",
    },
    warning: {
      toast:
        "!border-amber-200 !bg-amber-50 dark:!bg-amber-950 dark:!border-amber-800",
      title: "!text-amber-800 dark:!text-amber-200",
      description: "!text-amber-700 dark:!text-amber-300",
      actionButton: "!bg-amber-600 hover:!bg-amber-700 !text-white",
      cancelButton:
        "!bg-amber-100 hover:!bg-amber-200 !text-amber-800 dark:!bg-amber-900 dark:!text-amber-200",
    },
    info: {
      toast:
        "!border-blue-200 !bg-blue-50 dark:!bg-blue-950 dark:!border-blue-800",
      title: "!text-blue-800 dark:!text-blue-200",
      description: "!text-blue-700 dark:!text-blue-300",
      actionButton: "!bg-blue-600 hover:!bg-blue-700 !text-white",
      cancelButton:
        "!bg-blue-100 hover:!bg-blue-200 !text-blue-800 dark:!bg-blue-900 dark:!text-blue-200",
    },
    loading: {
      toast:
        "!border-gray-200 !bg-gray-50 dark:!bg-gray-950 dark:!border-gray-800",
      title: "!text-gray-800 dark:!text-gray-200",
      description: "!text-gray-700 dark:!text-gray-300",
      actionButton: "!bg-gray-600 hover:!bg-gray-700 !text-white",
      cancelButton:
        "!bg-gray-100 hover:!bg-gray-200 !text-gray-800 dark:!bg-gray-900 dark:!text-gray-200",
    },
  };

  return themeMap[type];
};

// Main notify function for ApiResponse
export function notify({ res, options, t }: NotifyProps) {
  if (!res?.success && !res?.errors && !res?.message && !res?.errors) return;

  const isSuccess = res.success;
  const type: ToastType = isSuccess ? "success" : "error";
  const title = isSuccess
    ? t
      ? t("common.success")
      : "Success"
    : t
    ? t("common.error")
    : "Error";

  const duration = isSuccess ? 4000 : 6000;

  // Handle success or single error message
  if (isSuccess) {
    const message = res.message;
    if (message) {
      showToast({
        type,
        title,
        description: message,
        duration,
        ...options,
      }, t);
    }
  }

  // Handle multiple validation errors
  if (res.errors && typeof res.errors === "object") {
    Object.entries(res.errors).forEach(([field, messages]) => {
      // Handle array of error messages for each field
      console.log(field);
      const title = t ? t("common.validationError") : "Validation Error";

      if (Array.isArray(messages)) {
        messages.forEach((message: string) => {
          showToast({
            type: "error",
            title,
            description: message,
            duration: 6000,
            ...options,
          }, t);
        });
      }
      // // Handle single error message for a field
      // else if (typeof messages === 'string') {
      //   showToast({
      //     type: 'error',
      //     title: 'Validation Error',
      //     description: messages,
      //     duration: 6000,
      //     ...options
      //   });
      // }
    });
  }
}

// Generic toast function with full control
export function showToast(options: NotifyOptions, t?: TFunction<"translation", undefined>) {
  const {
    type = "info",
    title,
    description,
    duration,
    action,
    position = "top-center",
    dismissible = true,
    id,
  } = options;

  const themeClasses = getThemeClasses(type);
  const icon = getIcon(type);

  const toastOptions = {
    description,
    position,
    duration: duration || 8000,
    dismissible,
    ...(id && { id }),
    ...(icon && { icon }),
    ...(action && { action }),
    cancel: {
      label: t ? t("common.cancel") : "Cancel",
      onClick: () => {},
    },
    classNames: {
      ...themeClasses,
      closeButton:
        "!text-gray-400 hover:!text-gray-600 dark:!text-gray-500 dark:hover:!text-gray-300",
    },
  };

  // Use appropriate toast method based on type
  switch (type) {
    case "success":
      return toast.success(title, toastOptions);
    case "error":
      return toast.error(title, toastOptions);
    case "warning":
      return toast.warning(title, toastOptions);
    case "info":
      return toast.info(title, toastOptions);
    case "loading":
      return toast.loading(title, toastOptions);
    default:
      return toast(title, toastOptions);
  }
}

// Convenience functions for different toast types
export const toastSuccess = (
  title: string,
  description?: string,
  options?: Partial<NotifyOptions>
) => showToast({ type: "success", title, description, ...options });

export const toastError = (
  title: string,
  description?: string,
  options?: Partial<NotifyOptions>
) => showToast({ type: "error", title, description, ...options });

export const toastWarning = (
  title: string,
  description?: string,
  options?: Partial<NotifyOptions>
) => showToast({ type: "warning", title, description, ...options });

export const toastInfo = (
  title: string,
  description?: string,
  options?: Partial<NotifyOptions>
) => showToast({ type: "info", title, description, ...options });

export const toastLoading = (
  title: string,
  description?: string,
  options?: Partial<NotifyOptions>
) => showToast({ type: "loading", title, description, ...options });

// Promise-based toast for async operations
export const toastPromise = <T,>(
  promise: Promise<T>,
  {
    loading = "Loading...",
    success = "Success!",
    error = "Something went wrong",
  }: {
    loading?: string;
    success?: string | ((data: T) => string);
    error?: string | ((error: unknown) => string);
  }
) => {
  return toast.promise(promise, {
    loading,
    success,
    error,
    position: "top-center",
  });
};

// Dismiss functions
export const dismissToast = (id?: string) => {
  if (id) {
    toast.dismiss(id);
  } else {
    toast.dismiss();
  }
};

export const dismissAllToasts = () => toast.dismiss();

// Usage examples:
/*
// Basic ApiResponse usage (your original use case)
notify(actionResponse);

// With custom options
notify(actionResponse, { 
  duration: 5000, 
  position: 'bottom-right',
  action: { label: 'Retry', onClick: () => retryAction() }
});

// Direct toast usage
showToast({
  type: 'warning',
  title: 'Warning',
  description: 'This action cannot be undone',
  action: { label: 'Proceed', onClick: () => proceedWithAction() },
  cancel: { label: 'Cancel', onClick: () => cancelAction() }
});

// Convenience functions
toastSuccess('Saved!', 'Your changes have been saved successfully');
toastError('Failed to save', 'Please check your connection and try again');

// Promise-based toast
toastPromise(
  fetch('/api/data'),
  {
    loading: 'Fetching data...',
    success: 'Data loaded successfully!',
    error: 'Failed to fetch data'
  }
);

// Dismiss toasts
dismissToast('specific-toast-id');
dismissAllToasts();
*/
