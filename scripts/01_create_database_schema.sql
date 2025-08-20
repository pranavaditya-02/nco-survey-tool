-- NCO Smart Survey Tool Database Schema
-- This script creates all necessary tables for the survey application

-- Enable UUID extension for PostgreSQL
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table for all user types (citizens, admins, analysts)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20) UNIQUE,
    aadhaar_number VARCHAR(12) UNIQUE,
    password_hash VARCHAR(255),
    user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('citizen', 'admin', 'analyst')),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    date_of_birth DATE,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
    state VARCHAR(50),
    city VARCHAR(50),
    pincode VARCHAR(10),
    preferred_language VARCHAR(10) DEFAULT 'en',
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE
);

-- Departments table for government departments
CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(20) NOT NULL UNIQUE,
    description TEXT,
    contact_email VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Surveys table for survey metadata
CREATE TABLE surveys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    department_id UUID REFERENCES departments(id),
    created_by UUID REFERENCES users(id),
    category VARCHAR(50),
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed', 'archived')),
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    max_responses INTEGER,
    estimated_duration INTEGER, -- in minutes
    primary_language VARCHAR(10) DEFAULT 'en',
    supported_languages TEXT[], -- array of language codes
    requires_auth BOOLEAN DEFAULT TRUE,
    allow_multiple_responses BOOLEAN DEFAULT FALSE,
    enable_voice_input BOOLEAN DEFAULT TRUE,
    enable_ai_translation BOOLEAN DEFAULT TRUE,
    enable_adaptive_questioning BOOLEAN DEFAULT TRUE,
    quality_score DECIMAL(3,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Questions table for survey questions
CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    survey_id UUID REFERENCES surveys(id) ON DELETE CASCADE,
    question_order INTEGER NOT NULL,
    question_type VARCHAR(20) NOT NULL CHECK (question_type IN ('mcq', 'mcq-multiple', 'text', 'textarea', 'likert', 'ranking', 'boolean', 'date', 'number')),
    title TEXT NOT NULL,
    description TEXT,
    is_required BOOLEAN DEFAULT FALSE,
    options JSONB, -- for MCQ, ranking questions
    validation_rules JSONB, -- validation constraints
    skip_logic JSONB, -- conditional logic rules
    translations JSONB, -- multilingual translations
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(survey_id, question_order)
);

-- Survey responses table
CREATE TABLE survey_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    survey_id UUID REFERENCES surveys(id),
    user_id UUID REFERENCES users(id),
    session_id VARCHAR(255), -- for anonymous responses
    status VARCHAR(20) DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
    language_used VARCHAR(10) DEFAULT 'en',
    device_type VARCHAR(20),
    ip_address INET,
    user_agent TEXT,
    start_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completion_time TIMESTAMP WITH TIME ZONE,
    total_time_spent INTEGER, -- in seconds
    quality_score DECIMAL(3,2),
    is_flagged BOOLEAN DEFAULT FALSE,
    fraud_score DECIMAL(3,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Individual question answers
CREATE TABLE question_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    response_id UUID REFERENCES survey_responses(id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(id),
    answer_data JSONB NOT NULL, -- flexible storage for different answer types
    answer_text TEXT, -- for text-based answers
    time_spent INTEGER, -- time spent on this question in seconds
    was_voice_input BOOLEAN DEFAULT FALSE,
    confidence_score DECIMAL(3,2), -- for AI-processed answers
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(response_id, question_id)
);

-- Certificates table for participation certificates
CREATE TABLE certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    survey_id UUID REFERENCES surveys(id),
    response_id UUID REFERENCES survey_responses(id),
    certificate_id VARCHAR(50) UNIQUE NOT NULL,
    certificate_type VARCHAR(20) DEFAULT 'participation',
    issued_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_downloaded BOOLEAN DEFAULT FALSE,
    download_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Analytics events table for tracking user interactions
CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type VARCHAR(50) NOT NULL,
    user_id UUID REFERENCES users(id),
    survey_id UUID REFERENCES surveys(id),
    session_id VARCHAR(255),
    event_data JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Fraud detection alerts
CREATE TABLE fraud_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    alert_type VARCHAR(50) NOT NULL,
    severity VARCHAR(20) CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    survey_id UUID REFERENCES surveys(id),
    response_id UUID REFERENCES survey_responses(id),
    user_id UUID REFERENCES users(id),
    description TEXT,
    alert_data JSONB,
    status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'investigating', 'resolved', 'false_positive')),
    assigned_to UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- System settings table
CREATE TABLE system_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value JSONB,
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_aadhaar ON users(aadhaar_number);
CREATE INDEX idx_users_type ON users(user_type);
CREATE INDEX idx_surveys_status ON surveys(status);
CREATE INDEX idx_surveys_department ON surveys(department_id);
CREATE INDEX idx_surveys_dates ON surveys(start_date, end_date);
CREATE INDEX idx_questions_survey ON questions(survey_id);
CREATE INDEX idx_responses_survey ON survey_responses(survey_id);
CREATE INDEX idx_responses_user ON survey_responses(user_id);
CREATE INDEX idx_responses_status ON survey_responses(status);
CREATE INDEX idx_answers_response ON question_answers(response_id);
CREATE INDEX idx_answers_question ON question_answers(question_id);
CREATE INDEX idx_certificates_user ON certificates(user_id);
CREATE INDEX idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_events_survey ON analytics_events(survey_id);
CREATE INDEX idx_fraud_alerts_severity ON fraud_alerts(severity);
CREATE INDEX idx_fraud_alerts_status ON fraud_alerts(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_surveys_updated_at BEFORE UPDATE ON surveys FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
