export type ActionResponse =
  | {
      success?: boolean;
      message?: string;
      error?: string | null;
      errors?: {
        [key: string]: string[];
      };
    }
  | undefined;
