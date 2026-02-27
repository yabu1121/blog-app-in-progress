package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/yabu1121/blog-backend/domain/models"
	"gorm.io/gorm"
)

type PostHandler struct {
	DB *gorm.DB
}

func (h *PostHandler) CreatePost (c echo.Context) error {
	req := models.CreatePostRequest{}
	if err := c.Bind(&req);err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error":"invalid request"})
	}
	post := models.Post{
		Title: req.Title,
		Content: req.Content,
		UserID: req.UserID,
	}
	if err := h.DB.Create(&post).Error;err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error":"internal server error"})
	}
	return c.JSON(http.StatusCreated, post)
}

func (h *PostHandler) GetAllPost (c echo.Context) error {
	var posts []models.Post
	if err := h.DB.Preload("User").Find(&posts).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error":"internal server error"})
	}
	res := make([]models.GetPostResponse, len(posts))
	for i, p := range posts {
		res[i] = models.GetPostResponse{
			ID: p.ID,
			Title: p.Title,
			Content: p.Content,
			User: models.GetUserResponse{
				ID:p.User.ID,
				Name: p.User.Name,
			},
			CreatedAt: p.CreatedAt,
			UpdatedAt: p.UpdatedAt,
		}
	}
	return c.JSON(http.StatusOK, res)
}

func (h *PostHandler) GetPostById (c echo.Context) error {
	id := c.Param("id")
	if id == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"error":"id is required"})
	}
	var post models.Post
	if err := h.DB.Preload("User").First(&post, id).Error;err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "internal server error"})
	}

	res := models.GetPostResponse{
		ID: post.ID,
		Title: post.Title,
		Content: post.Content,
		User: models.GetUserResponse{
			ID: post.User.ID,
			Name: post.User.Name,
		},
		CreatedAt: post.CreatedAt,
		UpdatedAt: post.UpdatedAt,
	}
	return c.JSON(http.StatusOK, res)
}

func (h *PostHandler) GetPostByIdWithComment (c echo.Context) error {
	id := c.Param("id")
	if id == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"error":"id is required"})
	}
	var post models.Post
	if err := h.DB.Preload("User").Preload("Comments.Author").First(&post, id).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "internal server error"})
	}

	resComments := []models.GetCommentResponse{}
	for _, item := range post.Comments {
		temp := models.GetCommentResponse{
			Title: item.Title,
			Content: item.Content,
			AuthorID: item.AuthorID,
			Author: models.GetUserResponse{
				ID: item.Author.ID,
				Name: item.Author.Name,
			},
			CreatedAt: item.CreatedAt,
		}
		resComments = append(resComments, temp)
	}

	res := models.GetPostResponse{
		ID: post.ID,
		Title: post.Title,
		Content: post.Content,
		User: models.GetUserResponse{
			ID: post.User.ID,
			Name: post.User.Name,
		}
		Comments: resComments,
		CreatedAt: post.CreatedAt,
		UpdatedAt: post.UpdatedAt,
	}

	return c.JSON(http.StatusOK, res)
}

func (h * PostHandler) DeletePost (c echo.Context) error {
	id := c.Param("id")
	if id == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "id is required"})
	}
	if err := h.DB.Where("id = ?", id).Delete(&models.Post{}).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "internal server error"})
	}
	return c.NoContent(http.StatusNoContent)
}

func (h *PostHandler) UpdatePost (c echo.Context) error {
	id := c.Param("id")
	if id == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "id is required"})
	}
	var req models.CreatePostRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
	}
	if err := h.DB.Model(&models.Post{}).Where("id = ?", id).Updates(req).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "internal server error"})
	}
	return c.JSON(http.StatusOK, req)
}