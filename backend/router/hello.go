package router

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type HelloResponse struct {
	ID int64 `json:"id"`
	Message string `json:"message"`
}

func Hello (c echo.Context) error {
	res := HelloResponse{
		ID: 1,
		Message: "hello world",
	}
	return c.JSON(http.StatusOK, res)
}