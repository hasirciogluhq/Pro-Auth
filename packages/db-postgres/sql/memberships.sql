-- name: CreateMembership :one
INSERT INTO memberships (user_id, namespace_id, role, created_at)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: GetMembershipByID :one
SELECT * FROM memberships
WHERE id = $1;

-- name: GetMembershipsByUserID :many
SELECT * FROM memberships
WHERE user_id = $1
ORDER BY created_at DESC;

-- name: GetMembershipsByNamespaceID :many
SELECT * FROM memberships
WHERE namespace_id = $1
ORDER BY created_at DESC;

-- name: GetMembershipByUserAndNamespace :one
SELECT * FROM memberships
WHERE user_id = $1 AND namespace_id = $2;

-- name: UpdateMembershipRole :one
UPDATE memberships
SET role = $2
WHERE id = $1
RETURNING *;

-- name: DeleteMembership :exec
DELETE FROM memberships
WHERE id = $1;

-- name: DeleteMembershipsByUserID :exec
DELETE FROM memberships
WHERE user_id = $1;

-- name: DeleteMembershipsByNamespaceID :exec
DELETE FROM memberships
WHERE namespace_id = $1; 