package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/yabu1121/blog-backend/database"
	"github.com/yabu1121/blog-backend/handler"
)

func main() {

	e := echo.New()
	e.Use(middleware.RequestLogger())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	database.InitDB()
	// database.SeedUsers(database.DB)

	userHandler := &handler.UserHandler{DB: database.DB}
	postHandler := &handler.PostHandler{DB: database.DB}

	e.GET("/user", userHandler.GetAllUser)
	e.GET("/user/:id", userHandler.GetUserById)
	e.POST("/user", userHandler.CreateUser)
	e.GET("/post", postHandler.GetAllPost)
	e.GET("/post/:id", postHandler.GetPostById)
	e.POST("/post", postHandler.CreatePost)

	if err := e.Start(":8080"); err != nil {
		e.Logger.Error("failed to start server", "error", err)
	}
}
