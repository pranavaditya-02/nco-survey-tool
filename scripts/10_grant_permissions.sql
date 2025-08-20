-- Grant appropriate permissions for different user roles

-- Create roles if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'survey_admin') THEN
        CREATE ROLE survey_admin;
    END IF;
    
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'survey_analyst') THEN
        CREATE ROLE survey_analyst;
    END IF;
    
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'survey_citizen') THEN
        CREATE ROLE survey_citizen;
    END IF;
END
$$;

-- Admin permissions (full access)
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO survey_admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO survey_admin;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO survey_admin;

-- Analyst permissions (read access + analytics)
GRANT SELECT ON ALL TABLES IN SCHEMA public TO survey_analyst;
GRANT SELECT, INSERT, UPDATE ON fraud_alerts TO survey_analyst;
GRANT SELECT, INSERT ON analytics_events TO survey_analyst;
GRANT EXECUTE ON FUNCTION get_survey_completion_rate(UUID) TO survey_analyst;
GRANT EXECUTE ON FUNCTION detect_response_fraud(UUID) TO survey_analyst;

-- Citizen permissions (limited access)
GRANT SELECT ON surveys, questions, departments TO survey_citizen;
GRANT SELECT, INSERT, UPDATE ON survey_responses TO survey_citizen;
GRANT SELECT, INSERT, UPDATE ON question_answers TO survey_citizen;
GRANT SELECT ON certificates TO survey_citizen;
GRANT SELECT, INSERT ON analytics_events TO survey_citizen;

-- Row Level Security policies
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Citizens can only access their own responses
CREATE POLICY citizen_own_responses ON survey_responses
    FOR ALL TO survey_citizen
    USING (user_id = current_setting('app.current_user_id')::UUID);

CREATE POLICY citizen_own_answers ON question_answers
    FOR ALL TO survey_citizen
    USING (response_id IN (
        SELECT id FROM survey_responses 
        WHERE user_id = current_setting('app.current_user_id')::UUID
    ));

CREATE POLICY citizen_own_certificates ON certificates
    FOR SELECT TO survey_citizen
    USING (user_id = current_setting('app.current_user_id')::UUID);
