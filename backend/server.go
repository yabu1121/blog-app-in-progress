package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/yabu1121/blog-backend/handler"
	"github.com/yabu1121/blog-backend/database"
)

func main(){

	e := echo.New()
	e.Use(middleware.RequestLogger())

	database.InitDB()
	// database.SeedUsers(database.DB)
	
	userHandler := &handler.UserHandler{DB: database.DB}
	postHandler := &handler.PostHandler{DB: database.DB}

	e.GET("/", handler.Hello);
	e.GET("/user", userHandler.GetAllUser);
	e.GET("/user/:id", userHandler.GetUserById);
	e.POST("/user", userHandler.CreateUser);
	e.GET("/post", postHandler.GetAllPost);
	e.GET("/post/:id", postHandler.GetPostById);
	e.POST("/post", postHandler.CreatePost);

	if err := e.Start(":8080"); err != nil{
		e.Logger.Error("failed to start server", "error", err)
	}
}
