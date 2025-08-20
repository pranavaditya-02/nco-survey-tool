-- Create a sample survey for testing
DO $$
DECLARE
    dept_id UUID;
    admin_id UUID;
    survey_id UUID;
BEGIN
    -- Get department and admin IDs
    SELECT id INTO dept_id FROM departments WHERE code = 'MIT' LIMIT 1;
    SELECT id INTO admin_id FROM users WHERE email = 'admin@mit.gov.in' LIMIT 1;
    
    -- Create sample survey
    INSERT INTO surveys (
        title, 
        description, 
        department_id, 
        created_by, 
        category, 
        status, 
        start_date, 
        end_date, 
        max_responses, 
        estimated_duration,
        supported_languages
    ) VALUES (
        'Digital India Awareness Survey',
        'Help us understand digital literacy and technology adoption across India. Your responses will help improve government digital services.',
        dept_id,
        admin_id,
        'awareness',
        'active',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP + INTERVAL '45 days',
        50000,
        10,
        ARRAY['en', 'hi', 'bn', 'ta', 'te', 'mr', 'gu', 'kn']
    ) RETURNING id INTO survey_id;
    
    -- Add sample questions
    INSERT INTO questions (survey_id, question_order, question_type, title, description, is_required, options) VALUES
    (survey_id, 1, 'mcq', 'How often do you use digital government services?', 'This includes services like Aadhaar updates, tax filing, or applying for certificates online.', TRUE, 
     '["Daily", "Weekly", "Monthly", "Rarely", "Never"]'::jsonb),
    
    (survey_id, 2, 'textarea', 'What challenges do you face when using digital government services?', 'Please describe any difficulties or barriers you encounter.', FALSE, NULL),
    
    (survey_id, 3, 'likert', 'How satisfied are you with the current digital government services?', 'Rate your overall satisfaction level.', TRUE, 
     '{"scale": {"min": 1, "max": 5, "labels": ["Very Dissatisfied", "Dissatisfied", "Neutral", "Satisfied", "Very Satisfied"]}}'::jsonb),
    
    (survey_id, 4, 'mcq-multiple', 'Which digital devices do you use to access government services?', 'Select all that apply.', TRUE,
     '["Smartphone", "Laptop/Desktop Computer", "Tablet", "Internet Cafe/Common Service Center", "None of the above"]'::jsonb),
    
    (survey_id, 5, 'mcq', 'What is your age group?', 'This helps us understand usage patterns across different age groups.', TRUE,
     '["18-25", "26-35", "36-45", "46-55", "56-65", "Above 65"]'::jsonb),
    
    (survey_id, 6, 'mcq', 'What is your primary language preference for government services?', 'Select your preferred language for digital services.', TRUE,
     '["English", "Hindi", "Bengali", "Tamil", "Telugu", "Marathi", "Gujarati", "Kannada", "Other"]'::jsonb),
    
    (survey_id, 7, 'boolean', 'Would you recommend digital government services to others?', 'Based on your experience, would you encourage others to use these services?', TRUE, NULL),
    
    (survey_id, 8, 'textarea', 'Any additional suggestions for improving digital government services?', 'Share your ideas for making these services better and more accessible.', FALSE, NULL);
    
END $$;
