-- Create views for analytics and reporting
CREATE OR REPLACE VIEW survey_statistics AS
SELECT 
    s.id,
    s.title,
    s.status,
    d.name as department_name,
    COUNT(sr.id) as total_responses,
    COUNT(CASE WHEN sr.status = 'completed' THEN 1 END) as completed_responses,
    ROUND(
        COUNT(CASE WHEN sr.status = 'completed' THEN 1 END)::DECIMAL / 
        NULLIF(COUNT(sr.id), 0) * 100, 2
    ) as completion_rate,
    AVG(sr.total_time_spent) as avg_response_time,
    AVG(sr.quality_score) as avg_quality_score,
    s.created_at,
    s.start_date,
    s.end_date
FROM surveys s
LEFT JOIN departments d ON s.department_id = d.id
LEFT JOIN survey_responses sr ON s.id = sr.survey_id
GROUP BY s.id, s.title, s.status, d.name, s.created_at, s.start_date, s.end_date;

-- Demographics view
CREATE OR REPLACE VIEW response_demographics AS
SELECT 
    sr.survey_id,
    s.title as survey_title,
    qa.answer_data->>'age_group' as age_group,
    COUNT(*) as response_count,
    sr.language_used,
    sr.device_type
FROM survey_responses sr
JOIN surveys s ON sr.survey_id = s.id
LEFT JOIN question_answers qa ON sr.id = qa.response_id
LEFT JOIN questions q ON qa.question_id = q.id AND q.title ILIKE '%age%'
WHERE sr.status = 'completed'
GROUP BY sr.survey_id, s.title, qa.answer_data->>'age_group', sr.language_used, sr.device_type;

-- Fraud detection view
CREATE OR REPLACE VIEW fraud_summary AS
SELECT 
    DATE_TRUNC('day', created_at) as alert_date,
    alert_type,
    severity,
    COUNT(*) as alert_count,
    COUNT(CASE WHEN status = 'resolved' THEN 1 END) as resolved_count
FROM fraud_alerts
GROUP BY DATE_TRUNC('day', created_at), alert_type, severity
ORDER BY alert_date DESC;

-- Response timeline view
CREATE OR REPLACE VIEW response_timeline AS
SELECT 
    DATE_TRUNC('day', sr.created_at) as response_date,
    s.id as survey_id,
    s.title as survey_title,
    COUNT(*) as daily_responses,
    COUNT(CASE WHEN sr.status = 'completed' THEN 1 END) as daily_completions,
    AVG(sr.total_time_spent) as avg_time_spent
FROM survey_responses sr
JOIN surveys s ON sr.survey_id = s.id
GROUP BY DATE_TRUNC('day', sr.created_at), s.id, s.title
ORDER BY response_date DESC;
