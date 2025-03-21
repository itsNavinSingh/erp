package models

import "time"

// LoginApi: Use to accept data sent for Login Request
type LoginApi struct {
	Email    string `json:"Email" binding:"required,rla_mail"`
	Password string `json:"Password" binding:"required"`
	Role     string `json:"Role" binding:"required"`
	Device   string `json:"Device" binding:"required"`
}

// UserDetailApi: Use to send User Data when requested
type UserDetailApi struct {
	UserID uint   `json:"UserID"`
	Name   string `json:"Name" binding:"required"`
	Email  string `json:"Email" binding:"required,rla_mail"`
	Role   string `json:"Role" binding:"required"`
}
type DeleteUserApi struct {
	UserID uint   `json:"UserID" binding:"required,min=1"`
	Name   string `json:"Name"`
	Email  string `json:"Email" binding:"rla_mail"`
	Role   string `json:"Role" binding:"st_role"`
}
type DepartmentApi struct {
	ID   uint   `json:"ID"`
	Name string `json:"Name" binding:"required"`
}
type ViewTeacherApi struct {
	ID           uint   `json:"ID"`
	UserID       uint   `json:"UserID"`
	Email        string `json:"Email"`
	Prefix       string `json:"Prefix"`
	Name         string `json:"Name"`
	Phone        uint   `json:"Phone"`
	DepartmentID uint   `json:"DepartmentID"`
	Department   string `json:"Department"`
}
type AddTeacherApi struct {
	ID           uint   `json:"ID"`
	UserID       uint   `json:"UserID" binding:"required,min=1"`
	Prefix       string `json:"Prefix" binding:"required"`
	Phone        uint   `json:"Phone" binding:"required,valid_phone"`
	DepartmentID uint   `json:"DepartmentID" binding:"required,min=1"`
}
type EditTeacherApi struct {
	ID           uint   `json:"ID" binding:"required,min=1"`
	UserID       uint   `json:"UserID"`
	Prefix       string `json:"Prefix"`
	Phone        uint   `json:"Phone" binding:"valid_phone"`
	DepartmentID uint   `json:"DepartmentID"`
}

type ViewCourseApi struct {
	ID           uint   `json:"ID"`
	Name         string `json:"Name" binding:"required"`
	DepartmentID uint   `json:"DepartmentID" binding:"required,min=1"`
	Department   string `json:"Department"`
}
type EditCourseApi struct {
	ID           uint   `json:"ID" binding:"required,min=1"`
	Name         string `json:"Name"`
	DepartmentID uint   `json:"DepartmentID"`
}

type ViewPapersApi struct {
	ID           uint   `json:"ID"`
	Name         string `json:"Name" binding:"required"`
	UPC          uint   `json:"UPC" binding:"required"`
	Semister     uint   `json:"Semister" binding:"required,min=1,max=8"`
	DepartmentID uint   `json:"DepartmentID" binding:"required,min=1"`
	Department   string `json:"Department"`
	Type         string `json:"Type" binding:"required"`
	CreditL      uint   `json:"CreditL"`
	CreditT      uint   `json:"CreditT"`
	CreditP      uint   `json:"CreditP"`
	Syllabus     string `json:"Syllabus" binding:"required"`
}

type EditPaperApi struct {
	ID           uint   `json:"ID" binding:"required,min=1"`
	Name         string `json:"Name"`
	UPC          uint   `json:"UPC"`
	Semister     uint   `json:"Semister"`
	DepartmentID uint   `json:"DepartmentID"`
	Department   string `json:"Department"`
	Type         string `json:"Type"`
	CreditL      uint   `json:"CreditL"`
	CreditT      uint   `json:"CreditT"`
	CreditP      uint   `json:"CreditP"`
	Syllabus     string `json:"Syllabus"`
}

type ViewStudentApi struct {
	ID             uint      `json:"ID"`
	UserID         uint      `json:"UserID" binding:"required,min=1"`
	Name           string    `json:"Name"`
	Email          string    `json:"Email"`
	Dob            time.Time `json:"Dob" binding:"required"`
	Phone          uint      `json:"Phone" binding:"required,valid_phone"`
	EnrollmentYear uint      `json:"EnrollmentYear" binding:"required"`
	Semister       uint      `json:"Semister" binding:"required,min=1"`
	CourseID       uint      `json:"CourseID" binding:"required,min=1"`
	Course         string    `json:"Course"`
}
type EditStudentApi struct {
	ID             uint      `json:"ID" binding:"required,min=1"`
	UserID         uint      `json:"UserID" binding:"min=1"`
	Dob            time.Time `json:"Dob"`
	Phone          uint      `json:"Phone" binding:"valid_phone"`
	EnrollmentYear uint      `json:"EnrollmentYear"`
	Semister       uint      `json:"Semister"`
	CourseID       uint      `json:"CourseID"`
}

type ViewClassApi struct {
	ID        uint   `json:"ID"`
	PaperID   uint   `json:"PaperID" binding:"required,min=1"`
	Paper     string `json:"Paper"`
	Type      string `json:"Type" binding:"required,oneof=L T P"`
	TeacherID uint   `json:"TeacherID" binding:"required,min=1"`
	Teacher   string `json:"Teacher"`
}

type EditClassApi struct {
	ID        uint   `json:"ID" binding:"required,min=1"`
	PaperID   uint   `json:"PaperID" binding:"min=1"`
	Type      string `json:"Type" binding:"oneof=L T P"`
	TeacherID uint   `json:"TeacherID" binding:"min=1"`
}

type ViewStudentPaperApi struct {
	ID        uint   `json:"ID"`
	StudentID uint   `json:"StudentID" binding:"required,min=1"`
	Student   string `json:"Student"`
	PaperID   uint   `json:"PaperID" binding:"required,min=1"`
	Paper     string `json:"Paper"`
}

type EditStudentPaperApi struct {
	ID        uint `json:"ID" binding:"required,min=1"`
	StudentID uint `json:"StudentID" binding:"min=1"`
	PaperID   uint `json:"PaperID" binding:"min=1"`
}

type ViewTimetableApi struct {
	ID        uint      `json:"ID"`
	ClassID   uint      `json:"ClassID" binding:"required,min=1"`
	PaperID   uint      `json:"PaperID"`
	Paper     string    `json:"Paper"`
	TeacherID uint      `json:"TeacherID"`
	Teacher   string    `json:"Teacher"`
	ClassType string    `json:"ClassType"`
	Day       uint      `json:"Day" binding:"required,max=6"`
	Location  string    `json:"Location" binding:"required"`
	Start     time.Time `json:"Start" binding:"required"`
}

type EditTimetableApi struct {
	ID       uint      `json:"ID" binding:"required,min=1"`
	ClassID  uint      `json:"ClassID" binding:"min=1"`
	Day      uint      `json:"Day" binding:"max=6"`
	Location string    `json:"Location"`
	Start    time.Time `json:"Start"`
}
