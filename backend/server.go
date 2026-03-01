package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/yabu1121/blog-backend/database"
	"github.com/yabu1121/blog-backend/handler"
	authmiddleware "github.com/yabu1121/blog-backend/middleware"
)

func main() {

	e := echo.New()
	e.Use(middleware.RequestLogger())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowHeaders:     []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
		AllowCredentials: true,
	}))

	database.InitDB()

	userHandler := &handler.UserHandler{DB: database.DB}
	postHandler := &handler.PostHandler{DB: database.DB}
	commentHandler := &handler.CommentHandler{DB: database.DB}

	// 認証不要なルート（閲覧・ログイン系）
	e.GET("/", handler.Hello)
	e.POST("/signup", userHandler.SignUp)
	e.POST("/login", userHandler.Login)
	e.GET("/user", userHandler.GetAllUser)
	e.GET("/user/:id", userHandler.GetUserById)
	e.GET("/post", postHandler.GetAllPost)
	e.GET("/post/:id", postHandler.GetPostById)
	e.GET("/post/:id/comments", commentHandler.GetComments)

	// 認証が必要なルート（書き込み系）
	authGroup := e.Group("")
	authGroup.Use(authmiddleware.JWTAuth)
	authGroup.POST("/user", userHandler.CreateUser)
	authGroup.POST("/post", postHandler.CreatePost)
	authGroup.PUT("/post/:id", postHandler.UpdatePost)
	authGroup.DELETE("/post/:id", postHandler.DeletePost)
	authGroup.POST("/post/:id/comment", commentHandler.CreateComment)

	if err := e.Start(":8080"); err != nil {
		e.Logger.Error("failed to start server", "error", err)
	}
}

