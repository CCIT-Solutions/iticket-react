import { toast } from "sonner";
import { ApiResponse } from "@/types/apiResponse";

export type ToastType = "success" | "error" | "warning" | "info";

interface NotifyOptions {
  type?: ToastType;
  message?: string;
  duration?: number;
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center";
}

export function notify(
  resOrMessage: ApiResponse | string,
  options?: NotifyOptions
) {
  const type = options?.type ?? "info";
  const position = options?.position ?? "top-center";
  const duration = options?.duration ?? 4000;

  let message: string | undefined;

  if (typeof resOrMessage === "string") {
    message = resOrMessage;
  } else {
    message = resOrMessage?.message;
  }

  if (!message) return;

  // const icons: Record<ToastType, string> = {
  //   success: "✅",
  //   error: "❌",
  //   warning: "⚠️",
  //   info: "ℹ️",
  // };

  const toastOptions = { position, duration };

  switch (type) {
    case "success":
      return toast.success(message, toastOptions);
    case "error":
      return toast.error(message, toastOptions);
    case "warning":
      return toast.warning(message, toastOptions);
    case "info":
    default:
      return toast.info(message, toastOptions);
  }
}
