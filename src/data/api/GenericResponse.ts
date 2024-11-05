interface Failure {
  message: string;
  responseCode?: number;
  errors?: string[];
}

interface Success<T> {
  data: T;
  responseCode: number;
  message: string;
}

class GenericResponse {
  success?: boolean;
  message?: string;
  responseCode?: number;
  errors?: string[];
  data?: any;

  constructor({
    success = false,
    message = '',
    responseCode = 0,
    errors = [],
    data,
  }: {
    success?: boolean;
    message?: string;
    responseCode?: number;
    errors?: string[];
    data?: any;
  }) {
    this.success = success;
    this.message = message;
    this.responseCode = responseCode;
    this.errors = errors;
    this.data = data;
  }

  static fromJson<T>(
    response: Failure | Success<T>,
    parseJson?: (data: any) => T
  ): GenericResponse {
    if ('data' in response) {
      return new GenericResponse({
        responseCode: response.responseCode,
        success: true,
        message: response.message ?? '',
        data: parseJson ? parseJson(response.data) : response.data,
      });
    } else {
      return new GenericResponse({
        responseCode: response.responseCode ?? 0,
        message: response.message,
        errors: response.errors || [],
      });
    }
  }

  static getErrorMessage(message: any): string[] {
    if (Array.isArray(message) && message.length > 0) {
      return message;
    }
    if (typeof message === 'string') return [message];
    return ['Something went wrong, try again!'];
  }
}

export default GenericResponse;
