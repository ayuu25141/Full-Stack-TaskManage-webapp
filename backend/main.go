package main

import (
	register "Mindmeshbackend/Register"
	"Mindmeshbackend/dbconn"
	"fmt"
	"os"

	"Mindmeshbackend/task"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	port := os.Getenv("PORT")
	app := fiber.New()


    app.Use(cors.New()) // Enable CORS for all routes
    // ... rest of your code

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Backend is running")
	})

	fmt.Println("Server is running")
	dbconn.ConnectDB()
	defer dbconn.CloseDB()
	fmt.Println("Database connected")

	app.Post("/createtask", task.CreateTaskHandler)
	app.Post("/register",register.RegisterUser)
app.Post("/login",register.Login)
app.Get("/tasks", task.GetUserTasksHandler)



	app.Listen(":" + port)
}
