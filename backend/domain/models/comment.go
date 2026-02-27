package models

import (
	"github.com/yabu1121/blog-backend/domain/models/helpers"
)

type Comment struct {
	ID uint `json:"id" gorm:"primaryKey"`
	Title string `json:"title"`
	Content string `json:"content"`

	PostID uint `json:"post_id"`
	Post Post `json:"post" gorm:"foreignKey:PostID"`

	AuthorID uint `json:"author_id" gorm:"foreignKey:AuthorID"`
	Author User `json:"author"`

	helpers.Timestamps
}

type CreateCommentRequest struct {
	Title string `json:"title"`
	Content string `json:"content"`
	PostID uint `json:"post_id"`
	AuthorID uint `json:"author_id"`
}

type GetCommentResponse struct {
	Title string `json:"title"`
	Content string `json:"content"`
	AuthorID uint `json:"author_id"`
	Author GetUserResponse `json:"author"`
	CreatedAt string `json:"created_at"`
}
