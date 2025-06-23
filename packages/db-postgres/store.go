package dbpostgres

import (
	"context"
	"fmt"
	"time"

	db "github.com/hasirciogli/pro-auth/packages/db-postgres/gen"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
)

// Store defines all database operations and high-level logic
type Store interface {
	// Helper functions
	ExecTx(ctx context.Context, fn func(*db.Queries) error) error
	CreateUserWithIdentity(ctx context.Context, arg CreateUserWithIdentityParams) (db.User, db.Identity, error)
	GetUserByIdentity(ctx context.Context, identityType string, identityValue string) (db.User, error)
	GetUserNamespaces(ctx context.Context, userID string) ([]db.Namespace, error)
	GetNamespaceMembers(ctx context.Context, namespaceID string) ([]db.User, error)
}

// SQLStore implements Store interface
type SQLStore struct {
	*db.Queries
	dbpool *pgxpool.Pool
}

// NewStore creates a new store instance
func NewStore(dbpool *pgxpool.Pool) Store {
	return &SQLStore{
		dbpool:  dbpool,
		Queries: db.New(dbpool),
	}
}

// ExecTx executes a function within a database transaction
func (store *SQLStore) ExecTx(ctx context.Context, fn func(*db.Queries) error) error {
	tx, err := store.dbpool.Begin(ctx)
	if err != nil {
		return err
	}

	q := db.New(tx)
	err = fn(q)
	if err != nil {
		if rbErr := tx.Rollback(ctx); rbErr != nil {
			return fmt.Errorf("tx err: %v, rb err: %v", err, rbErr)
		}
		return err
	}

	return tx.Commit(ctx)
}

// CreateUserWithIdentityParams contains parameters for creating a user with an identity
type CreateUserWithIdentityParams struct {
	Password      *string // Nullable password
	IdentityType  string
	IdentityValue string
}

// CreateUserWithIdentity creates a user with an initial identity in a single transaction
func (store *SQLStore) CreateUserWithIdentity(ctx context.Context, arg CreateUserWithIdentityParams) (db.User, db.Identity, error) {
	var user db.User
	var identity db.Identity

	err := store.ExecTx(ctx, func(q *db.Queries) error {
		var err error

		var passwordParam pgtype.Text
		if arg.Password != nil {
			passwordParam = pgtype.Text{String: *arg.Password, Valid: true}
		} else {
			passwordParam = pgtype.Text{Valid: false}
		}

		// identity type can be email or username
		if arg.IdentityType != "email" && arg.IdentityType != "username" {
			return fmt.Errorf("invalid identity type: %s", arg.IdentityType)
		}

		// identity db scan check
		identity, err = q.GetIdentityByTypeAndValue(ctx, db.GetIdentityByTypeAndValueParams{
			Type:  arg.IdentityType,
			Value: arg.IdentityValue,
		})

		if err != nil {
			return err
		}

		// Create user
		user, err = q.CreateUser(ctx, db.CreateUserParams{
			Password:  passwordParam,
			CreatedAt: pgtype.Timestamp{Time: time.Now(), Valid: true},
		})

		if err != nil {
			return err
		}

		// Create identity
		identity, err = q.CreateIdentity(ctx, db.CreateIdentityParams{
			UserID:    user.ID,
			Type:      arg.IdentityType,
			Value:     arg.IdentityValue,
			Verified:  false, // Default to not verified
			CreatedAt: pgtype.Timestamp{Time: time.Now(), Valid: true},
		})
		if err != nil {
			return err
		}

		return nil
	})

	return user, identity, err
}

// GetUserByIdentity retrieves a user by their identity (email/username)
func (store *SQLStore) GetUserByIdentity(ctx context.Context, identityType string, identityValue string) (db.User, error) {
	identity, err := store.GetIdentityByTypeAndValue(ctx, db.GetIdentityByTypeAndValueParams{
		Type:  identityType,
		Value: identityValue,
	})
	if err != nil {
		return db.User{}, fmt.Errorf("could not get identity: %w", err)
	}

	return store.GetUserByID(ctx, identity.UserID)
}

// GetUserNamespaces retrieves all namespaces a user is a member of
func (store *SQLStore) GetUserNamespaces(ctx context.Context, userID string) ([]db.Namespace, error) {
	memberships, err := store.GetMembershipsByUserID(ctx, userID)
	if err != nil {
		return nil, err
	}

	if len(memberships) == 0 {
		return []db.Namespace{}, nil
	}

	var namespaces []db.Namespace
	for _, membership := range memberships {
		namespace, err := store.GetNamespaceByID(ctx, membership.NamespaceID)
		if err != nil {
			return nil, fmt.Errorf("could not get namespace %s: %w", membership.NamespaceID, err)
		}
		namespaces = append(namespaces, namespace)
	}

	return namespaces, nil
}

// GetNamespaceMembers retrieves all members of a namespace
func (store *SQLStore) GetNamespaceMembers(ctx context.Context, namespaceID string) ([]db.User, error) {
	memberships, err := store.GetMembershipsByNamespaceID(ctx, namespaceID)
	if err != nil {
		return nil, err
	}

	if len(memberships) == 0 {
		return []db.User{}, nil
	}

	var users []db.User
	for _, membership := range memberships {
		user, err := store.GetUserByID(ctx, membership.UserID)
		if err != nil {
			return nil, fmt.Errorf("could not get user %s: %w", membership.UserID, err)
		}
		users = append(users, user)
	}

	return users, nil
}
