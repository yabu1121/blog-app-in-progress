package models

import "github.com/yabu1121/blog-backend/domain/models/helpers"


type User struct {
	ID uint `gorm:"primaryKey"`
	Name string `gorm:"size:255;not null"`
	Email string `gorm:"uniqueIndex;not null"`
	Password string `gorm:"not null"`
	Posts []Post `gorm:"foreignKey:UserID"`
	helpers.Timestamps
}

type GetUserResponse struct {
	ID uint `json:"id"`
	Name string `json:"name"`
}

type CreateUserRequest struct {
	Name string `json:"name" validate:"required,min=2"`
	Email string `json:"email" validate:"required,email"`
}

type SignUpRequest struct {
	Email string `json:"email"`
	Password string `json:"password"`
}