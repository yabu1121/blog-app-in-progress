package router

import (
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
)

type UserResponse struct {
	ID int `json:"id"`
	Name string `json:"name"`
	Age int `json:"age"`
 	Skills []string `json:"skills"`
	IsActive bool  `json:"is_active"`
}

func GetUser (c echo.Context) error {
	time.Sleep(2000 * time.Millisecond)
	user := UserResponse{
		ID: 1,
		Name: "yabu",
		Age: 20,
		Skills: []string{"Go", "Next.js", "ts"},
		IsActive: true,
	}
	return c.JSON(http.StatusOK, user)
} 