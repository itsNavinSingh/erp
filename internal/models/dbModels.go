package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID       uint
	Name     string `gorm:"not null"`
	Email    string `gorm:"unique;not null"`
	Password string `gorm:"not null"`
	Role     string
}

type Department struct {
	ID   uint
	Name string `gorm:"not null"`
}

type Teacher struct {
	ID           uint
	UserID       uint `gorm:"unique;not null"`
	User         User `gorm:"foreignKey:UserID"`
	Prefix       string
	Phone        uint
	DepartmentID uint       `gorm:"not null"`
	Department   Department `gorm:"foreignKey:DepartmentID"`
}

type Course struct {
	ID           uint
	Name         string     `gorm:"not null"`
	DepartmentID uint       `gorm:"not null"`
	Department   Department `gorm:"foreignKey:DepartmentID"`
}

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

type Class struct {
	ID        uint
	PaperID   uint    `gorm:"not null"`
	Paper     Paper   `gorm:"foreignKey:PaperID"`
	Type      string  `gorm:"type:char(1);not null"`
	TeacherID uint    `gorm:"not null"`
	Teacher   Teacher `gorm:"foreignKey:TeacherID"`
}

type StudentPaper struct {
	ID        uint
	StudentID uint    `gorm:"not null"`
	Student   Student `gorm:"foreignKey:StudentID"`
	PaperID   uint    `gorm:"not null"`
	Paper     Paper   `gorm:"foreignKey:PaperID"`
}

type TimeTable struct {
	ID       uint
	ClassID  uint      `gorm:"not null"`
	Class    Class     `gorm:"foreignKey:ClassID"`
	Day      uint      `gorm:"type:smallint;check:day >= 0 AND day <= 9;not null"`
	Location string    `gorm:"not null"`
	Start    time.Time `gorm:"type:time;not null"`
}

type Attendence struct {
	gorm.Model
	StudentID uint    `gorm:"not null"`
	Student   Student `gorm:"foreignKey:StudentID"`
	ClassID   uint    `gorm:"not null"`
	Class     Class   `gorm:"foreignKey:ClassID"`
	Date      time.Time
	Status    bool `gorm:"not null"`
}