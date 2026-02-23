package models

import (
	"time"

	"github.com/yabu1121/blog-backend/domain/models/helpers"
)


type Post struct {
	ID uint `gorm:"primaryKey" json:"id"`
	Title string  `gorm:"size:255;not null" json:"title"`
	Content string `gorm:"type:text;not null" json:"content"`
	helpers.Timestamps
}

type CreatePostRequest struct {
	Title string `json:"title"`
	Content string `json:"content"`
}

type GetPostResponse struct {
	ID uint `json:"id"`
	Title string `json:"title"`
	Content string `json:"content"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}