package models

import "github.com/yabu1121/blog-backend/domain/models/helpers"


type User struct {
	ID uint `json:"id"`
	Name string `json:"name"`
	Email string `json:"email"`
	helpers.Timestamps
}