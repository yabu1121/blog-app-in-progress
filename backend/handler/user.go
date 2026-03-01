package handler

import (
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"github.com/yabu1121/blog-backend/domain/models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type UserHandler struct{
	DB *gorm.DB
}

func (h *UserHandler) GetAllUser(c echo.Context) error {
	var users []models.User
	if err := h.DB.Find(&users).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "internal server error"})
	}

	res := make([]models.GetUserResponse, len(users))
	for i, u := range users {
		res[i] = models.GetUserResponse{
			ID:   u.ID,
			Name: u.Name,
		}
	}
	return c.JSON(http.StatusOK, res)
}

func (h *UserHandler) GetUserById(c echo.Context) error {
	id := c.Param("id")
	var user models.User
	if err := h.DB.First(&user, id).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "internal server error"})
	}
	res := models.GetUserResponse{
		ID:   user.ID,
		Name: user.Name,
	}
	return c.JSON(http.StatusOK, res)
}

func (h *UserHandler) CreateUser(c echo.Context) error {
	req := models.CreateUserRequest{}
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "model isn't proper"})
	}

	user := models.User{
		Name:  req.Name,
		Email: req.Email,
	}
	if err := h.DB.Create(&user).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "internal server error"})
	}

	res := models.GetUserResponse{
		ID:   user.ID,
		Name: user.Name,
	}

	return c.JSON(http.StatusCreated, res)
}

func (h *UserHandler) SignUp(c echo.Context) error {
	var req models.SignUpUserRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "failed to hash password"})
	}

	user := models.User{
		Name:     req.Name,
		Email:    req.Email,
		Password: string(hashedPassword),
	}
	if err := h.DB.Create(&user).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "could not create user"})
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"exp":     time.Now().Add(time.Hour * 72).Unix(),
	})
	t, err := token.SignedString([]byte(os.Getenv("SECRET_KEY")))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "failed to generate token"})
	}

	return c.JSON(http.StatusCreated, models.JwtResponse{Token: t})
}

func (h *UserHandler) Login (c echo.Context) error {
	var req models.LoginUserRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
	}

	var user models.User
	if err := h.DB.Where("email = ?", req.Email).First(&user).Error; err != nil {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": "invalid email or password"})
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": "invalid email or password"})
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"exp":     time.Now().Add(time.Hour * 72).Unix(),
	})
	t, err := token.SignedString([]byte(os.Getenv("SECRET_KEY")))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "failed to generate token"})
	}

	return c.JSON(http.StatusOK, models.JwtResponse{Token: t})
}
