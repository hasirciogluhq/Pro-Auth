-- name: CreateIdentity :one
INSERT INTO identities (user_id, type, value, verified, created_at)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- name: GetIdentityByID :one
SELECT * FROM identities
WHERE id = $1;

-- name: GetIdentitiesByUserID :many
SELECT * FROM identities
WHERE user_id = $1
ORDER BY created_at DESC;

-- name: GetIdentityByTypeAndValue :one
SELECT * FROM identities
WHERE type = $1 AND value = $2;

-- name: UpdateIdentityVerified :one
UPDATE identities
SET verified = $2
WHERE id = $1
RETURNING *;

-- name: UpdateIdentityValue :one
UPDATE identities
SET value = $2
WHERE id = $1
RETURNING *;

-- name: DeleteIdentity :exec
DELETE FROM identities
WHERE id = $1;

-- name: DeleteIdentitiesByUserID :exec
DELETE FROM identities
WHERE user_id = $1; 