package database

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/yabu1121/blog-backend/domain/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	host := os.Getenv("DB_HOST")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")
	port := os.Getenv("DB_PORT")

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Tokyo",
		host, user, password, dbname, port,
	)

	var err error
	for i := 0; i < 10; i++ {
		DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
			PrepareStmt: true, // プリペアドステートメントをキャッシュして高速化
		})
		if err == nil {
			break
		}
		log.Printf("DB接続に失敗しました。5秒後にリトライします... (%d/10): %v", i+1, err)
		time.Sleep(5 * time.Second)
	}

	if err != nil {
		log.Fatal("DB接続の最終試行に失敗しました:", err)
	}

	log.Println("DB接続に成功しました。")

	sqlDB, _ := DB.DB()
	sqlDB.SetMaxIdleConns(1000) // アイドル接続数を最大と同等にして接続コストをゼロにする
	sqlDB.SetMaxOpenConns(1000)
	sqlDB.SetConnMaxLifetime(time.Hour)
	if err := DB.AutoMigrate(
		&models.User{},
		&models.Post{},
	); err != nil {
		log.Fatal("Migration Failed", err)
	}
	log.Println("Migration Successful")

}