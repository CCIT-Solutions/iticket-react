export interface ApiResponse<T = unknown, M = Record<string, unknown>> {
  success?: boolean; 
  message?: string;
  data?: T;
  meta?: M;
  errors?: Record<string, string[]>;
}