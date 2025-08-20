-- System settings and configuration
INSERT INTO system_settings (setting_key, setting_value, description, is_public) VALUES
('app_name', '"NCO Smart Survey Tool"', 'Application name', TRUE),
('app_version', '"1.0.0"', 'Current application version', TRUE),
('max_survey_duration', '60', 'Maximum survey duration in minutes', FALSE),
('default_language', '"en"', 'Default system language', TRUE),
('supported_languages', '["en", "hi", "bn", "ta", "te", "mr", "gu", "kn", "ml", "pa", "or", "as"]', 'List of supported languages', TRUE),
('fraud_detection_enabled', 'true', 'Enable AI fraud detection', FALSE),
('voice_input_enabled', 'true', 'Enable voice input features', TRUE),
('ai_translation_enabled', 'true', 'Enable AI translation services', TRUE),
('max_responses_per_survey', '100000', 'Maximum responses allowed per survey', FALSE),
('certificate_template', '{"template": "default", "include_qr": true}', 'Certificate generation settings', FALSE),
('analytics_retention_days', '365', 'Days to retain analytics data', FALSE),
('session_timeout_minutes', '30', 'User session timeout in minutes', FALSE);
