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
	commentHandler := &handler.CommentHandler{DB: database.DB}

	e.GET("/", handler.Hello)
	e.GET("/user", userHandler.GetAllUser)
	e.GET("/user/:id", userHandler.GetUserById)
	e.POST("/user", userHandler.CreateUser)
	e.GET("/post", postHandler.GetAllPost)
	e.GET("/post/:id", postHandler.GetPostById)
	e.PUT("/post/:id", postHandler.UpdatePost)
	e.DELETE("/post/:id", postHandler.DeletePost)
	e.POST("/post", postHandler.CreatePost)
	e.GET("/post/:id/comments", commentHandler.GetComments)
	e.POST("/post/:id/comment", commentHandler.CreateComment)

	if err := e.Start(":8080"); err != nil {
		e.Logger.Error("failed to start server", "error", err)
	}
}
