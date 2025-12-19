package task

import (
	"context"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"log"
	"Mindmeshbackend/dbconn"
	"time"
)

// Task represents the structure of a task in the database.
type Task struct {
	ID          string `json:"id"`
	UserID      string `json:"user_id"`
	Title       string `json:"title"`
	Description string `json:"description,omitempty"`
	Completed   bool   `json:"completed"`
	CreatedAt  time.Time `json:"created_at,omitempty"`
	UpdatedAt   time.Time `json:"updated_at,omitempty"`
}

// CreateTaskRequest represents the JSON input for creating a task.
type CreateTaskRequest struct {
	UserID      string `json:"user_id"`
	Title       string `json:"title"`
	Description string `json:"description,omitempty"`
	Completed   bool   `json:"completed,omitempty"`
}

// CreateTaskHandler creates a new task from JSON input.
func CreateTaskHandler(c *fiber.Ctx) error {
	var input CreateTaskRequest
	if err := c.BodyParser(&input); err != nil {
		log.Printf("Error parsing request body: %v", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	// Validate required fields
	if input.Title == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Title is required",
		})
	}
	if input.UserID == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "User ID is required",
		})
	}

	// Create the task
	task := Task{
		ID:          uuid.New().String(),
		UserID:      input.UserID,
		Title:       input.Title,
		Description: input.Description,
		Completed:   input.Completed,
	}

	// Insert into the database
	_, err := dbconn.Pool.Exec(
		context.Background(),
		`INSERT INTO tasks (id, user_id, title, description, completed)
		 VALUES ($1, $2, $3, $4, $5)`,
		task.ID,
		task.UserID,
		task.Title,
		task.Description,
		task.Completed,
	)

	if err != nil {
		log.Printf("Error creating task: %v", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to create task: " + err.Error(),
		})
	}

	// Return the created task as JSON
	return c.Status(fiber.StatusCreated).JSON(task)
}
