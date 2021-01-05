CREATE TABLE IF NOT EXISTS transactions (
    create_time DATETIME,
    amount DECIMAL(10, 2),
    description VARCHAR(255),
    category VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS budget_goals (
    create_time DATETIME,
    goals JSON,
    timeframe VARCHAR(255)
);