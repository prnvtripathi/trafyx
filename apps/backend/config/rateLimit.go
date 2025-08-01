package config

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"
	
	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
)

var ctx = context.Background()
var redisClient *redis.Client

// ConnectRedis initializes and tests the Redis connection
func ConnectRedis() error {
	redisAddr := os.Getenv("REDIS_HOST")
	if redisAddr == "" {
		redisAddr = "localhost:6379" // Default to localhost for development
	}

	redisClient = redis.NewClient(&redis.Options{
		Addr:     redisAddr,
		Password: "",
		DB:       0,
	})

	pong, err := redisClient.Ping(ctx).Result()
	if err != nil {
		log.Fatalf("Failed to connect to Redis: %v", err)
	}
	fmt.Println("Redis connected:", pong)

	return nil
}

func IsRedisConnected() bool {
	pong, err := redisClient.Ping(ctx).Result()
	if err != nil {
		return false
	}
	return pong == "PONG"
}

type Response struct {
	Message string `json:"message"`
	Status  int    `json:"status"`
}

func RateLimiter() gin.HandlerFunc {
	return func(c *gin.Context) {
		ip := c.ClientIP() // more reliable for production
		key := fmt.Sprintf("rate_limit:%s", ip)
		limit := 5
		window := 60 * time.Second

		count, err := redisClient.Incr(ctx, key).Result()
		if err != nil {
			log.Printf("Redis Incr error: %v", err)
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "Internal Server Error"})
			return
		}

		if count == 1 {
			if _, err := redisClient.Expire(ctx, key, window).Result(); err != nil {
				log.Printf("Redis Expire error: %v", err)
				c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "Internal Server Error"})
				return
			}
		}

		if count > int64(limit) {
			c.AbortWithStatusJSON(http.StatusTooManyRequests, gin.H{"message": "Rate limit exceeded. Try again later."})
			return
		}

		c.Next()
	}
}
