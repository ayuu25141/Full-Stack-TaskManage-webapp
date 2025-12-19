// d:/Mindmesh/backend/Register/Login.go
package register

import (
    	"Mindmeshbackend/dbconn"
    "context"
    "time"
    "github.com/gofiber/fiber/v2"
    "github.com/golang-jwt/jwt/v5"
    "golang.org/x/crypto/bcrypt"
)

type LoginRequest struct {
    Email    string `json:"email"`
    Password string `json:"password"`
}

type LoginResponse struct {
    Token string `json:"token"`
    User  struct {
        ID       string    `json:"id"`
        Fullname string    `json:"fullname"`
        Email    string    `json:"email"`
    } `json:"user"`
}

func Login(c *fiber.Ctx) error {
    var req LoginRequest
    
    // Parse request body
    if err := c.BodyParser(&req); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": "Invalid request data",
        })
    }

    // Find user by email
    var user struct {
        ID           string
        Fullname     string
        Email        string
        PasswordHash string
    }

    err := dbconn.Pool.QueryRow(
        context.Background(),
        `SELECT id, fullname, email, password_hash 
         FROM userdb 
         WHERE email = $1`,
        req.Email,
    ).Scan(&user.ID, &user.Fullname, &user.Email, &user.PasswordHash)

    if err != nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "error": "Invalid email or password",
        })
    }

    // Verify password
    if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password)); err != nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "error": "Invalid email or password",
        })
    }

    // Create JWT token
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "user_id": user.ID,
        "exp":     time.Now().Add(time.Hour * 72).Unix(),
    })

    tokenString, err := token.SignedString([]byte("your-secret-key")) // Replace with your secret key
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": "Could not generate token",
        })
    }

    // Return response
    response := LoginResponse{
        Token: tokenString,
        User: struct {
            ID       string `json:"id"`
            Fullname string `json:"fullname"`
            Email    string `json:"email"`
        }{
            ID:       user.ID,
            Fullname: user.Fullname,
            Email:    user.Email,
        },
    }

    return c.JSON(response)
}