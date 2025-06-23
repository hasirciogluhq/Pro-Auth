-- name: CreateUser :one
INSERT INTO users (password, created_at)
VALUES ($1, $2)
RETURNING *;

-- name: GetUserByID :one
SELECT * FROM users
WHERE id = $1;

-- name: UpdateUser :one
UPDATE users
SET password = $2, created_at = $3
WHERE id = $1
RETURNING *;

-- name: UpdatePassword :one
UPDATE users
SET password = $2
WHERE id = $1
RETURNING *;

-- name: RemovePassword :one
UPDATE users
SET password = NULL
WHERE id = $1
RETURNING *;

-- name: DeleteUser :exec
DELETE FROM users
WHERE id = $1;

-- name: ListUsers :many
SELECT * FROM users
ORDER BY created_at DESC;