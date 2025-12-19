// // GetUserTasksHandler gets all tasks for a specific user
// package task

// import (
// 	"context"
// 	"github.com/gofiber/fiber/v2"
	
// 	"Mindmeshbackend/dbconn"
// )
// // GetUserTasksHandler gets all tasks for a specific user
// func GetUserTasksHandler(c *fiber.Ctx) error {
//     userID := c.Query("user_id")
//     if userID == "" {
//         return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
//             "error": "user_id query parameter is required",
//         })
//     }

//     rows, err := dbconn.Pool.Query(
//         context.Background(),
//         `SELECT id, user_id, title, description, completed, created_at, updated_at
//          FROM tasks
//          WHERE user_id = $1
//          ORDER BY created_at DESC`,
//         userID,
//     )
//     if err != nil {
//         return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
//             "error": "failed to fetch tasks: " + err.Error(),
//         })
//     }
//     defer rows.Close()

//     var tasks []Task
//     for rows.Next() {
//         var task Task
//         err := rows.Scan(
//             &task.ID,
//             &task.UserID,
//             &task.Title,
//             &task.Description,
//             &task.Completed,
//             &task.CreatedAt,
//             &task.UpdatedAt,
//         )
//         if err != nil {
//             continue
//         }
//         tasks = append(tasks, task)
//     }

//     return c.JSON(tasks)
// }


package task

import (
	"context"
    "fmt"

	"github.com/gofiber/fiber/v2"
	"Mindmeshbackend/dbconn"
)

func GetUserTasksHandler(c *fiber.Ctx) error {
	userID := c.Query("user_id")
	if userID == "" {
		return c.Status(400).JSON(fiber.Map{
			"error": "user_id is required",
		})
	}

	rows, err := dbconn.Pool.Query(
		context.Background(),
		`SELECT id, user_id, title, description, completed, created_at, updated_at
		 FROM tasks
		 WHERE user_id = $1
		 ORDER BY created_at DESC`,
		userID,
	)
	if err != nil {
		fmt.Println("QUERY ERROR:", err) // 👈 LOG
		return c.Status(500).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	defer rows.Close()

	var tasks []Task

	for rows.Next() {
		var task Task
		err := rows.Scan(
			&task.ID,
			&task.UserID,
			&task.Title,
			&task.Description,
			&task.Completed,
			&task.CreatedAt,
			&task.UpdatedAt,
		)
		if err != nil {
			fmt.Println("SCAN ERROR:", err) // 👈 LOG
			return c.Status(500).JSON(fiber.Map{
				"error": err.Error(),
			})
		}
		tasks = append(tasks, task)
	}

	return c.JSON(tasks)
}
