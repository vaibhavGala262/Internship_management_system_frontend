import apiRequest from "@/lib/api-service"

export interface InternshipCreate {
  title: string
  company: string
  location: string
  duration: string
  deadline: string
  description: string
  skills_required: string[]
  teacher_id?: number
}

export interface InternshipFilter {
  limit?: number
  skip?: number
  search?: string
  skills?: string[]
}

const InternshipService = {
  getInternships: async (filters: InternshipFilter = {}) => {
    const { limit = 10, skip = 0, search = "", skills = [] } = filters

    let queryParams = `?limit=${limit}&skip=${skip}`

    if (search) {
      queryParams += `&search=${encodeURIComponent(search)}`
    }

    if (skills.length > 0) {
      skills.forEach((skill) => {
        queryParams += `&skills=${encodeURIComponent(skill)}`
      })
    }

    return await apiRequest(`/internships/${queryParams}`)
  },

  getInternshipById: async (id: number) => {
    console.log(id)
    return await apiRequest(`/my-internships/${id}`)
  },

  getTeacherInternships: async (teacherId: number) => {
    return await apiRequest(`/internships/${teacherId}`)
  },

  getMyInternships: async () => {
    return await apiRequest("/my_internships")
  },

  createInternship: async (internshipData: InternshipCreate) => {
    return await apiRequest("/internships/", {
      method: "POST",
      body: JSON.stringify(internshipData),
    })
  },

  enrollInInternship: async (internshipId: number) => {
    return await apiRequest("/enroll", {
      method: "POST",
      body: JSON.stringify({ internship_id: internshipId }),
    })
  },

  getEnrolledStudents: async (internshipId: number) => {
    return await apiRequest(`/enrolled_students/${internshipId}`)
  },
}

export default InternshipService