package database

import (
	"fmt"
	"log"

	"github.com/yabu1121/blog-backend/domain/models"
	"gorm.io/gorm"
)

func SeedUsers(db *gorm.DB) {
    batchSize := 1000 
    total := 100000
    
    for i := 0; i < total; i += batchSize {
        var users []models.User
        for j := 0; j < batchSize; j++ {
            index := i + j
            users = append(users, models.User{
                Name:  fmt.Sprintf("User-%d", index),
                Email: fmt.Sprintf("user%d@example.com", index),
            })
        }
        if err := db.Create(&users).Error; err != nil {
            log.Printf("Batch insert failed: %v", err)
        }
    }
    log.Println("100,000 users seeded successfully!")
}