import apiRequest from "@/lib/api-service"

export interface LoginCredentials {
  username: string
  password: string
}

export interface UserBase {
  email: string
  password: string
  first_name: string
  last_name: string
  type: string
}

export interface StudentCreate extends UserBase {
  type: "student"
  department: string
  roll_no: string
  graduation_year: number
  gpa: number
}

export interface TeacherCreate extends UserBase {
  type: "teacher"
  department: string
  start_date: string
}

export type RegisterData = StudentCreate | TeacherCreate

const AuthService = {
  login: async (credentials: LoginCredentials) => {
    const formData = new FormData()
    formData.append("username", credentials.username)
    formData.append("password", credentials.password)

    const response = await fetch("http://localhost:9000/login", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || "Login failed")
    }

    return await response.json()
  },

  register: async (userData: RegisterData) => {
    return await apiRequest("/users/", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  },

  getCurrentUser: async () => {
    return await apiRequest("/users/me")
  },

  logout: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userType")
  },
}

export default AuthService

