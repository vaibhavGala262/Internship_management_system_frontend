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

  downloadEnrolledStudentsExcel: async (internshipId: number) => {
    const token = localStorage.getItem("token")

    // Use fetch directly to get the binary data
    const response = await fetch(`http://localhost:9000/download-excel-enrolled-students/${internshipId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to download Excel file")
    }

    // Get the blob from the response
    const blob = await response.blob()

    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob)

    // Create a temporary link element
    const a = document.createElement("a")
    a.href = url
    a.download = `enrolled-students-${internshipId}.xlsx`

    // Append to the document
    document.body.appendChild(a)

    // Trigger the download
    a.click()

    // Clean up
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)

    return true
  },
}

export default InternshipService