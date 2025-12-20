package main

import (
	register "Mindmeshbackend/Register"
	"Mindmeshbackend/dbconn"
	"Mindmeshbackend/task"
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()

	port := os.Getenv("PORT")
	if port == "" {
		port = "5000"
	}

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
	}))

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Backend is running")
	})

	dbconn.ConnectDB()
	defer dbconn.CloseDB()

	app.Post("/createtask", task.CreateTaskHandler)
	app.Post("/register", register.RegisterUser)
	app.Post("/login", register.Login)
	app.Get("/tasks", task.GetUserTasksHandler)

	fmt.Println("Server running on port", port)
	app.Listen(":" + port)
}
