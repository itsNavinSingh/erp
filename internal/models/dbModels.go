package models

import (
	"time"

	"gorm.io/gorm"
)

// User: DB Model used to create users table to store User data
type User struct {
	ID       uint
	Name     string `gorm:"not null"`
	Email    string `gorm:"unique;not null"`
	Password string `gorm:"not null"`
	Role     string
}

// Department: DB Model used to create departments table to store Department data
type Department struct {
	ID   uint
	Name string `gorm:"unique;not null"`
}

// Teacher: DB Model used to create teachers table to store Teacher data
type Teacher struct {
	ID           uint
	UserID       uint `gorm:"unique;not null"`
	User         User `gorm:"foreignKey:UserID"`
	Prefix       string
	Phone        uint
	DepartmentID uint       `gorm:"not null"`
	Department   Department `gorm:"foreignKey:DepartmentID"`
}

// Course: DB Model used to create courses table to store Course data
type Course struct {
	ID           uint
	Name         string     `gorm:"not null"`
	DepartmentID uint       `gorm:"not null"`
	Department   Department `gorm:"foreignKey:DepartmentID"`
}

// Paper: DB Model used to create papers table to store Paper data
type Paper struct {
	ID           uint
	Name         string `gorm:"not null"`
	UPC          uint
	Semister     uint
	DepartmentID uint       `gorm:"not null"`
	Department   Department `gorm:"foreignKey:DepartmentID"`
	Type         string
	CreditL      uint
	CreditP      uint
	CreditT      uint
	Syllabus     string
}

// Student: DB Model used to create students table to store Student data
type Student struct {
	ID             uint
	UserID         uint      `gorm:"unique;not null"`
	User           User      `gorm:"foreignKey:UserID"`
	Dob            time.Time `gorm:"type:date"`
	Phone          uint
	EnrollmentYear uint
	Semister       uint
	CourseID       uint   `gorm:"not null"`
	Course         Course `gorm:"foreignKey:CourseID"`
}
// todo teacher
// Score: DB Model used to create scores table to store Score data
type Score struct {
	ID        uint
	StudentID uint    `gorm:"not null"`
	Student   Student `gorm:"foreignKey:StudentID"`
	PaperID   uint    `gorm:"not null"`
	Paper     Paper   `gorm:"foreignKey:PaperID"`
	TeacherID uint    `gorm:"not null"`
	Teacher   Teacher `gorm:"foreignKey:TeacherID"`
	Obtained  uint
	Total     uint `gorm:"not null"`
	ScoreType string
}

// Class: DB Model used to create classs table to store Class data
type Class struct {
	ID        uint
	PaperID   uint    `gorm:"not null"`
	Paper     Paper   `gorm:"foreignKey:PaperID"`
	Type      string  `gorm:"type:char(1);not null"`
	TeacherID uint    `gorm:"not null"`
	Teacher   Teacher `gorm:"foreignKey:TeacherID"`
}

// StudentPaper: DB Model used to create student_papers table to store Student's selected/assigned paper data
type StudentPaper struct {
	ID        uint
	StudentID uint    `gorm:"not null"`
	Student   Student `gorm:"foreignKey:StudentID"`
	PaperID   uint    `gorm:"not null"`
	Paper     Paper   `gorm:"foreignKey:PaperID"`
}
// todo admin
// TimeTable: DB Model used to create time_tables table to store Classes and their time
type TimeTable struct {
	ID       uint
	ClassID  uint      `gorm:"not null"`
	Class    Class     `gorm:"foreignKey:ClassID"`
	Day      uint      `gorm:"type:smallint;check:day >= 0 AND day <= 6;not null"`
	Location string    `gorm:"not null"`
	Start    time.Time `gorm:"type:time;not null"`
}
// todo teacher
// Attendence: DB Model used to create attendences table to store Student's Attendence data
type Attendence struct {
	gorm.Model
	StudentID uint    `gorm:"not null"`
	Student   Student `gorm:"foreignKey:StudentID"`
	ClassID   uint    `gorm:"not null"`
	Class     Class   `gorm:"foreignKey:ClassID"`
	Date      time.Time
	Status    bool `gorm:"not null"`
}