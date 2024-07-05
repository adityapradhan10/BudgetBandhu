-- Database and User Setup
CREATE DATABASE budget_bandhu;

-- Custom Types
CREATE TYPE transaction_type AS ENUM ('projected', 'actual');

-- Users Table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    salt VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Incomes Table
CREATE TABLE incomes (
    income_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    income_date DATE NOT NULL,
    type transaction_type NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

-- Expenses Table
CREATE TABLE expenses (
    expense_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    expense_date DATE NOT NULL,
    type transaction_type NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

-- Tags Table
CREATE TABLE tags (
    tag_id SERIAL PRIMARY KEY,
    user_id INT,
    tag_name VARCHAR(50) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

-- Income Tags Junction Table
CREATE TABLE income_tags (
    income_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (income_id, tag_id),
    FOREIGN KEY (income_id) REFERENCES incomes (income_id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags (tag_id) ON DELETE CASCADE
);

-- Expense Tags Junction Table
CREATE TABLE expense_tags (
    expense_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (expense_id, tag_id),
    FOREIGN KEY (expense_id) REFERENCES expenses (expense_id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags (tag_id) ON DELETE CASCADE
);
