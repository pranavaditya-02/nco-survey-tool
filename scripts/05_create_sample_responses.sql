-- Create sample survey responses for testing analytics
DO $$
DECLARE
    survey_id UUID;
    response_id UUID;
    question_ids UUID[];
    i INTEGER;
BEGIN
    -- Get the sample survey ID
    SELECT id INTO survey_id FROM surveys WHERE title = 'Digital India Awareness Survey' LIMIT 1;
    
    -- Get question IDs in order
    SELECT ARRAY(SELECT id FROM questions WHERE survey_id = survey_id ORDER BY question_order) INTO question_ids;
    
    -- Create 100 sample responses
    FOR i IN 1..100 LOOP
        -- Create response record
        INSERT INTO survey_responses (
            survey_id, 
            status, 
            language_used, 
            device_type, 
            start_time, 
            completion_time, 
            total_time_spent,
            quality_score
        ) VALUES (
            survey_id,
            'completed',
            CASE (i % 4) 
                WHEN 0 THEN 'en'
                WHEN 1 THEN 'hi' 
                WHEN 2 THEN 'bn'
                ELSE 'ta'
            END,
            CASE (i % 3)
                WHEN 0 THEN 'mobile'
                WHEN 1 THEN 'desktop'
                ELSE 'tablet'
            END,
            CURRENT_TIMESTAMP - INTERVAL '1 day' * (i % 30),
            CURRENT_TIMESTAMP - INTERVAL '1 day' * (i % 30) + INTERVAL '8 minutes',
            480 + (i % 300), -- 8-13 minutes
            8.0 + (i % 20) * 0.1 -- Quality score between 8.0-9.9
        ) RETURNING id INTO response_id;
        
        -- Add answers for each question
        -- Q1: Usage frequency
        INSERT INTO question_answers (response_id, question_id, answer_data, time_spent) VALUES
        (response_id, question_ids[1], 
         CASE (i % 5) 
            WHEN 0 THEN '"Daily"'
            WHEN 1 THEN '"Weekly"'
            WHEN 2 THEN '"Monthly"'
            WHEN 3 THEN '"Rarely"'
            ELSE '"Never"'
         END::jsonb, 
         30 + (i % 60));
        
        -- Q2: Challenges (text response)
        INSERT INTO question_answers (response_id, question_id, answer_data, answer_text, time_spent) VALUES
        (response_id, question_ids[2], '"text_response"'::jsonb, 
         CASE (i % 3)
            WHEN 0 THEN 'Sometimes the website is slow to load'
            WHEN 1 THEN 'Need better mobile interface'
            ELSE 'More language options would be helpful'
         END,
         90 + (i % 120));
        
        -- Q3: Satisfaction (Likert scale)
        INSERT INTO question_answers (response_id, question_id, answer_data, time_spent) VALUES
        (response_id, question_ids[3], 
         CASE (i % 5) 
            WHEN 0 THEN '1'
            WHEN 1 THEN '2'
            WHEN 2 THEN '3'
            WHEN 3 THEN '4'
            ELSE '5'
         END::jsonb, 
         25 + (i % 40));
        
        -- Q4: Devices (multiple choice)
        INSERT INTO question_answers (response_id, question_id, answer_data, time_spent) VALUES
        (response_id, question_ids[4], 
         CASE (i % 3)
            WHEN 0 THEN '["Smartphone"]'
            WHEN 1 THEN '["Smartphone", "Laptop/Desktop Computer"]'
            ELSE '["Tablet", "Internet Cafe/Common Service Center"]'
         END::jsonb,
         40 + (i % 50));
        
        -- Q5: Age group
        INSERT INTO question_answers (response_id, question_id, answer_data, time_spent) VALUES
        (response_id, question_ids[5], 
         CASE (i % 6) 
            WHEN 0 THEN '"18-25"'
            WHEN 1 THEN '"26-35"'
            WHEN 2 THEN '"36-45"'
            WHEN 3 THEN '"46-55"'
            WHEN 4 THEN '"56-65"'
            ELSE '"Above 65"'
         END::jsonb, 
         20 + (i % 30));
        
        -- Q6: Language preference
        INSERT INTO question_answers (response_id, question_id, answer_data, time_spent) VALUES
        (response_id, question_ids[6], 
         CASE (i % 4) 
            WHEN 0 THEN '"English"'
            WHEN 1 THEN '"Hindi"'
            WHEN 2 THEN '"Bengali"'
            ELSE '"Tamil"'
         END::jsonb, 
         25 + (i % 35));
        
        -- Q7: Recommendation (boolean)
        INSERT INTO question_answers (response_id, question_id, answer_data, time_spent) VALUES
        (response_id, question_ids[7], 
         CASE (i % 10) 
            WHEN 0 THEN 'false'
            WHEN 1 THEN 'false'
            ELSE 'true'
         END::jsonb, 
         15 + (i % 25));
        
        -- Q8: Additional suggestions (text)
        INSERT INTO question_answers (response_id, question_id, answer_data, answer_text, time_spent) VALUES
        (response_id, question_ids[8], '"text_response"'::jsonb,
         CASE (i % 4)
            WHEN 0 THEN 'Add more payment options'
            WHEN 1 THEN 'Improve mobile app design'
            WHEN 2 THEN 'Better customer support'
            ELSE 'Faster processing times'
         END,
         60 + (i % 90));
        
    END LOOP;
    
END $$;
