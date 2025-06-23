-- Active: 1736808567173@@localhost@5432@pro_auth
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (only id and created_at)
CREATE TABLE users (
    id TEXT PRIMARY KEY DEFAULT 'c' || substr(md5(random()::text), 1, 24),
    password TEXT DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Identities table for login information
CREATE TABLE identities (
    id TEXT PRIMARY KEY DEFAULT 'c' || substr(md5(random()::text), 1, 24),
    user_id TEXT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('email', 'username')),
    value TEXT NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    UNIQUE (type, value)
);

-- Namespaces table for organizations/workspaces
CREATE TABLE namespaces (
    id TEXT PRIMARY KEY DEFAULT 'c' || substr(md5(random()::text), 1, 24),
    slug TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    created_by TEXT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Memberships table for user-namespace relationships
CREATE TABLE memberships (
    id TEXT PRIMARY KEY DEFAULT 'c' || substr(md5(random()::text), 1, 24),
    user_id TEXT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    namespace_id TEXT NOT NULL REFERENCES namespaces (id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    UNIQUE (user_id, namespace_id)
);

-- Create indexes for better performance
CREATE INDEX idx_identities_user_id ON identities (user_id);

CREATE INDEX idx_identities_type_value ON identities(type, value);

CREATE INDEX idx_namespaces_created_by ON namespaces (created_by);

CREATE INDEX idx_namespaces_slug ON namespaces (slug);

CREATE INDEX idx_memberships_user_id ON memberships (user_id);

CREATE INDEX idx_memberships_namespace_id ON memberships (namespace_id);