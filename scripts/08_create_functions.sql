-- Utility functions for the survey application

-- Function to calculate survey completion rate
CREATE OR REPLACE FUNCTION get_survey_completion_rate(survey_uuid UUID)
RETURNS DECIMAL(5,2) AS $$
DECLARE
    completion_rate DECIMAL(5,2);
BEGIN
    SELECT 
        ROUND(
            COUNT(CASE WHEN status = 'completed' THEN 1 END)::DECIMAL / 
            NULLIF(COUNT(*), 0) * 100, 2
        ) INTO completion_rate
    FROM survey_responses 
    WHERE survey_id = survey_uuid;
    
    RETURN COALESCE(completion_rate, 0.00);
END;
$$ LANGUAGE plpgsql;

-- Function to detect potential fraud
CREATE OR REPLACE FUNCTION detect_response_fraud(response_uuid UUID)
RETURNS DECIMAL(3,2) AS $$
DECLARE
    fraud_score DECIMAL(3,2) := 0.00;
    response_time INTEGER;
    answer_count INTEGER;
    duplicate_count INTEGER;
BEGIN
    -- Get response details
    SELECT total_time_spent INTO response_time
    FROM survey_responses 
    WHERE id = response_uuid;
    
    -- Count answers
    SELECT COUNT(*) INTO answer_count
    FROM question_answers 
    WHERE response_id = response_uuid;
    
    -- Check for suspiciously fast completion (less than 30 seconds)
    IF response_time < 30 THEN
        fraud_score := fraud_score + 0.4;
    END IF;
    
    -- Check for too few answers
    IF answer_count < 3 THEN
        fraud_score := fraud_score + 0.3;
    END IF;
    
    -- Check for duplicate IP addresses (simplified)
    SELECT COUNT(*) INTO duplicate_count
    FROM survey_responses sr1
    JOIN survey_responses sr2 ON sr1.ip_address = sr2.ip_address
    WHERE sr1.id = response_uuid AND sr1.id != sr2.id;
    
    IF duplicate_count > 5 THEN
        fraud_score := fraud_score + 0.3;
    END IF;
    
    RETURN LEAST(fraud_score, 1.00);
END;
$$ LANGUAGE plpgsql;

-- Function to generate certificate ID
CREATE OR REPLACE FUNCTION generate_certificate_id(survey_title TEXT)
RETURNS VARCHAR(50) AS $$
DECLARE
    prefix VARCHAR(10);
    random_suffix VARCHAR(10);
BEGIN
    -- Create prefix from survey title
    prefix := UPPER(LEFT(REGEXP_REPLACE(survey_title, '[^A-Za-z]', '', 'g'), 3));
    
    -- Generate random suffix
    random_suffix := UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8));
    
    RETURN 'CERT-' || prefix || '-2024-' || random_suffix;
END;
$$ LANGUAGE plpgsql;

-- Function to update survey quality score
CREATE OR REPLACE FUNCTION update_survey_quality_score(survey_uuid UUID)
RETURNS VOID AS $$
DECLARE
    avg_quality DECIMAL(3,2);
BEGIN
    SELECT AVG(quality_score) INTO avg_quality
    FROM survey_responses 
    WHERE survey_id = survey_uuid AND status = 'completed';
    
    UPDATE surveys 
    SET quality_score = COALESCE(avg_quality, 0.00)
    WHERE id = survey_uuid;
END;
$$ LANGUAGE plpgsql;
