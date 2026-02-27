package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/yabu1121/blog-backend/domain/models"
	"gorm.io/gorm"
)

type CommentHandler struct {
	DB *gorm.DB
}

func 