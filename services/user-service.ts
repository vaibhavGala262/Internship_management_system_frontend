import apiRequest from "@/lib/api-service"

const UserService = {
  getUsers: async () => {
    return await apiRequest("/users/")
  },

  getUserById: async (id: number) => {
    return await apiRequest(`/users/${id}`)
  },

  updateUser: async (id: number, userData: any) => {
    return await apiRequest(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    })
  },

  deleteUser: async (id: number) => {
    return await apiRequest(`/users/${id}`, {
      method: "DELETE",
    })
  },
}

export default UserService
