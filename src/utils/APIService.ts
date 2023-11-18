export interface LoginResult {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

type RegistrationRequest = {
  password: string;
  email: string;
};

type RegistrationResponse = {
  success: boolean;
  message: string;
};

class APIService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getToken(): string | null {
    return localStorage.getItem("token");
  }
  private setToken(token: string) {
    localStorage.setItem("token", token);
  }

  async mockRegistration(
    requestData: RegistrationRequest
  ): Promise<RegistrationResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (requestData.password && requestData.email) {
          resolve({
            success: true,
            message: "Registration successful",
          });
        } else {
          reject({
            success: false,
            message: "Registration failed: Missing required fields",
          });
        }
      }, 1000);
    });
  }

  async login(
    username: string,
    password: string,
    expiresInMins?: number
  ): Promise<LoginResult> {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, expiresInMins }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data: LoginResult = await response.json();
    this.setToken(data.token);

    return data;
  }

  async makeAuthenticatedRequest(
    endpoint: string,
    method: string,
    data?: any
  ): Promise<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error("No token found in localStorage");
    }

    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: method,
      headers: headers,
      body: data ? JSON.stringify(data) : null,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  }
}

export { APIService };
