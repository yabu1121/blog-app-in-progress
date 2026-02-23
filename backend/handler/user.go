package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/yabu1121/blog-backend/domain/models"
	"gorm.io/gorm"
)

type UserHandler struct{
	DB *gorm.DB
}

func (h *UserHandler) GetAllUser (c echo.Context) error {
	var users []models.User
	if err := h.DB.Find(&users).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "internal server error"})
	}

	res := make([]models.GetUserResponse, len(users))
	for i, u := range users {
		res[i] = models.GetUserResponse{
			ID: u.ID,
			Name: u.Name,
		}
	}
	return c.JSON(http.StatusOK, res)
}


func (h *UserHandler) GetUserById (c echo.Context) error {
	id := c.Param("id")
	var user models.User
	if err := h.DB.First(&user, id).Error;err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error":"internal server error"})
	}
	res := models.GetUserResponse{
		ID: user.ID,
		Name: user.Name,
	}
	return c.JSON(http.StatusOK, res)
}

func (h *UserHandler) CreateUser (c echo.Context) error {
	req := models.CreateUserRequest{}

	if err := c.Bind(&req);err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error":"model isn't proper"})
	}

	user := models.User{
		Name: req.Name,
		Email: req.Email,
	}
	
	if err := h.DB.Create(&user).Error;err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "internal server error"})
	}

	res := models.GetUserResponse{
		ID: user.ID,
		Name: user.Name,
	}

	return c.JSON(http.StatusCreated, res)
}
