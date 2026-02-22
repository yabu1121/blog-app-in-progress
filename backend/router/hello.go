package router

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type HelloResponse struct {
	Message string `json:"message"`
}

func Hello (c echo.Context) error {
	res := HelloResponse{
		Message: "hello world",
	}
	return c.JSON(http.StatusOK, res)
}