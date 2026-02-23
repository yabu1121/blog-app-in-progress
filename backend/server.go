package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/yabu1121/blog-backend/router"
)

func main(){

	e := echo.New()
	e.Use(middleware.RequestLogger())

	e.GET("/", router.Hello);
	e.GET("/user", router.GetUser);

	if err := e.Start(":8080"); err != nil{
		e.Logger.Error("failed to start server", "error", err)
	}
}
