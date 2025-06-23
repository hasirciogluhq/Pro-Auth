-- name: CreateNamespace :one
INSERT INTO namespaces (id, slug, display_name, created_by, created_at)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- name: GetNamespaceByID :one
SELECT * FROM namespaces
WHERE id = $1;

-- name: GetNamespaceBySlug :one
SELECT * FROM namespaces
WHERE slug = $1;

-- name: GetNamespacesByCreatedBy :many
SELECT * FROM namespaces
WHERE created_by = $1
ORDER BY created_at DESC;

-- name: UpdateNamespaceDisplayName :one
UPDATE namespaces
SET display_name = $2
WHERE id = $1
RETURNING *;

-- name: UpdateNamespaceSlug :one
UPDATE namespaces
SET slug = $2
WHERE id = $1
RETURNING *;

-- name: DeleteNamespace :exec
DELETE FROM namespaces
WHERE id = $1;

-- name: ListNamespaces :many
SELECT * FROM namespaces
ORDER BY created_at DESC; 