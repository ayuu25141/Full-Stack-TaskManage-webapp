package register

type User struct {
	Fullname        string `json:"fullName"`        // ✅ matches frontend
	EmailAddress    string `json:"email"`           // ✅ matches frontend
	Password        string `json:"password"`        // ✅ matches frontend
	ConfirmPassword string `json:"confirmPassword"` // ✅ frontend sends this
}
