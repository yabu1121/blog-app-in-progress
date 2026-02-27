package models

import (
	"time"

	"github.com/yabu1121/blog-backend/domain/models/helpers"
)


type Post struct {
	ID uint `gorm:"primaryKey" json:"id"`
	Title string  `gorm:"size:255;not null" json:"title"`
	Content string `gorm:"type:text;not null" json:"content"`
	
	// belong to
	UserID    uint      `gorm:"not null" json:"user_id"`
	User User `gorm:"foreignKey:UserID" json:"user"`
	Comments []Comment `json:"comments"`
	helpers.Timestamps
}

type CreatePostRequest struct {
	Title string `json:"title" validate:"required"`
	Content string `json:"content" validate:"required"`
	UserID uint `json:"user_id"`
}

type GetPostResponse struct {
	ID uint `json:"id"`
	Title string `json:"title"`
	Content string `json:"content"`
	User GetUserResponse `json:"user"`
	Comments []GetCommentResponse `json:"comments"`

	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}