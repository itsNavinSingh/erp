package models

// LoginApi: Use to accept data sent for Login Request
type LoginApi struct {
	Email string `json:"Email" binding:"required,rla_mail"`
	Password string `json:"Password" binding:"required"`
	Role string `json:"Role" binding:"required"`
	Device string `json:"Device" binding:"required"`
}
// UserDetailApi: Use to send User Data when requested
type UserDetailApi struct {
	UserID uint `json:"UserID"`
	Name string `json:"Name" binding:"required"`
	Email string `json:"Email" binding:"required,rla_mail"`
	Role string `json:"Role" binding:"required"`
}
type DeleteUserApi struct {
	UserID uint `json:"UserID" binding:"required,min=1"`
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
	UserID uint `json:"UserID" binding:"required,min=1"`
	Prefix string `json:"Prefix" binding:"required"`
	Phone uint `json:"Phone" binding:"required,valid_phone"`
	DepartmentID uint `json:"DepartmentID" binding:"required,min=1"`
}
type EditTeacher struct {
    ID           uint `json:"ID" binding:"required,min=1"`
    UserID       uint `json:"UserID"`
    Prefix       string `json:"Prefix"`
    Phone        uint `json:"Phone"`
    DepartmentID uint `json:"DepartmentID"`
}

type ViewCourseApi struct {
	ID uint `json:"ID"`
	Name string `json:"Name" binding:"required"`
	DepartmentID uint `json:"DepartmentID" binding:"required,min=1"`
	Department string `json:"Department"`
}
type EditCourseApi struct {
	ID uint `json:"ID" binding:"required,min=1"`
	Name string `json:"Name"`
	DepartmentID uint `json:"DepartmentID"`
}

type ViewPapersApi struct {
	ID uint `json:"ID"`
	Name string `json:"Name" binding:"required"`
	UPC uint `json:"UPC" binding:"required"`
	Semister uint `json:"Semister" binding:"required,min=1,max=8"`
	DepartmentID uint `json:"DepartmentID" binding:"required,min=1"`
	Department string `json:"Department"`
	Type string `json:"Type" binding:"required"`
	CreditL uint `json:"CreditL"`
	CreditT uint `json:"CreditT"`
	CreditP uint `json:"CreditP"`
	Syllabus string `json:"Syllabus" binding:"required"`
}

type EditPaperApi struct {
	ID uint `json:"ID" binding:"required,min=1"`
	Name string `json:"Name"`
	UPC uint `json:"UPC"`
	Semister uint `json:"Semister"`
	DepartmentID uint `json:"DepartmentID"`
	Department string `json:"Department"`
	Type string `json:"Type"`
	CreditL uint `json:"CreditL"`
	CreditT uint `json:"CreditT"`
	CreditP uint `json:"CreditP"`
	Syllabus string `json:"Syllabus"`
}