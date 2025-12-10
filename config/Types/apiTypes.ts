// apiTypes.ts

// ---------- SUCCESS RESPONSE ----------
export interface ApiSuccessResponse<T = any> {
  data: {
    data: T;
    message: string;
    statusCode: number;
    success: boolean;
  };
}

// Specific signup success data
export interface SignUpSuccessData {
  data: string; // e.g., "Account created successfully."
  message: string;
  statusCode: number; // 200
  success: boolean;
}

export interface SignUpSuccessResponse {
  data: SignUpSuccessData;
}

// ---------- ERROR RESPONSE ----------
export interface ApiErrorResponse {
  error: {
    data?: {
      errorMessages?: Array<Record<string, any>>;
    };
    message: string;
    stack?: string;
    success: boolean;
  };
  status?: number;
}

// ---------- UNION TYPE FOR SIGNUP ----------
export type SignUpResponse = SignUpSuccessResponse | ApiErrorResponse;
