package models

// LoginApi: Use to accept data sent for Login Request
type LoginApi struct {
	Email string `json:"Email" binding:"required"`
	Password string `json:"Password" binding:"required"`
	Role string `json:"Role" binding:"required"`
	Device string `json:"Device" binding:"required"`
}
// UserDetailApi: Use to send User Data when requested
type UserDetailApi struct {
	UserID uint `json:"UserID"`
	Name string `json:"Name" binding:"required"`
	Email string `json:"Email" binding:"required"`
	Role string `json:"Role" binding:"required"`
}
type DeleteUserApi struct {
	UserID uint `json:"UserID" binding:"required"`
	Name string `json:"Name"`
	Email string `json:"Email"`
	Role string `json:"Role"`
}
type DepartmentApi struct {
	ID uint `json:"ID"`
	Name string `json:"Name" binding:"required"`
}
type ViewTeacherApi struct {
	ID uint `json:"ID"`
	Email string `json:"Email"`
	Prefix string `json:"Prefix"`
	Name string `json:"Name"`
	Phone uint `json:"Phone"`
	Department string `json:"Department"`
}
type AddTeacherApi struct {
	ID uint `json:"ID"`
	UserID uint `json:"UserID" binding:"required"`
	Prefix string `json:"Prefix" binding:"required"`
	Phone uint `json:"Phone" binding:"required"`
	DepartmentID uint `json:"DepartmentID" binding:"required"`
}
type EditTeacher struct {
    ID           uint `json:"ID" binding:"required"`
    UserID       uint `json:"UserID"`
    Prefix       string `json:"Prefix"`
    Phone        uint `json:"Phone"`
    DepartmentID uint `json:"DepartmentID"`
}

type ViewCourseApi struct {
	ID uint `json:"ID"`
	Name string `json:"Name" binding:"required"`
	DepartmentID uint `json:"DepartmentID" binding:"required"`
	Department string `json:"Department"`
}
type EditCourseApi struct {
	ID uint `json:"ID" binding:"required"`
	Name string `json:"Name"`
	DepartmentID uint `json:"DepartmentID"`
}

type ViewPapersApi struct {
	ID uint `json:"ID"`
	Name string `json:"Name" binding:"required"`
	UPC uint `json:"UPC" binding:"required"`
	Semister uint `json:"Semister" binding:"required"`
	DepartmentID uint `json:"DepartmentID" binding:"required"`
	Department string `json:"Department"`
	Type string `json:"Type" binding:"required"`
	CreditL uint `json:"CreditL"`
	CreditT uint `json:"CreditT"`
	CreditP uint `json:"CreditP"`
	Syllabus string `json:"Syllabus" binding:"required"`
}