
//USER TYPE
export interface User{
    studentId: string
    firstName: string
    lastName: String
    email: string
    role: "ADMIN"|"STUDENT"
}
export interface Book {
    id: number,
    name: string
    author: string
    publisher: string
    publicationYear: number
    subject: string
  }
  