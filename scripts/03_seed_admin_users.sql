-- Seed data for admin users
-- Note: In production, passwords should be properly hashed
INSERT INTO users (email, user_type, first_name, last_name, is_verified, is_active) VALUES
('admin@mit.gov.in', 'admin', 'Rajesh', 'Kumar', TRUE, TRUE),
('admin@mohfw.gov.in', 'admin', 'Priya', 'Sharma', TRUE, TRUE),
('admin@education.gov.in', 'admin', 'Amit', 'Singh', TRUE, TRUE),
('analyst@nco.gov.in', 'analyst', 'Sunita', 'Patel', TRUE, TRUE),
('analyst@data.gov.in', 'analyst', 'Vikram', 'Gupta', TRUE, TRUE);
