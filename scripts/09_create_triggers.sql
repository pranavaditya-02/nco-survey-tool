-- Triggers for automated data processing

-- Trigger to update fraud score when response is completed
CREATE OR REPLACE FUNCTION update_fraud_score_trigger()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
        NEW.fraud_score := detect_response_fraud(NEW.id);
        
        -- Create fraud alert if score is high
        IF NEW.fraud_score > 0.7 THEN
            INSERT INTO fraud_alerts (
                alert_type, 
                severity, 
                survey_id, 
                response_id, 
                description,
                alert_data
            ) VALUES (
                'High Fraud Score',
                CASE 
                    WHEN NEW.fraud_score > 0.9 THEN 'critical'
                    WHEN NEW.fraud_score > 0.8 THEN 'high'
                    ELSE 'medium'
                END,
                NEW.survey_id,
                NEW.id,
                'Response flagged for potential fraud based on automated analysis',
                jsonb_build_object('fraud_score', NEW.fraud_score, 'auto_generated', true)
            );
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER survey_response_fraud_check
    BEFORE UPDATE ON survey_responses
    FOR EACH ROW
    EXECUTE FUNCTION update_fraud_score_trigger();

-- Trigger to create certificate when survey is completed
CREATE OR REPLACE FUNCTION create_certificate_trigger()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
        INSERT INTO certificates (
            user_id,
            survey_id,
            response_id,
            certificate_id,
            certificate_type
        ) VALUES (
            NEW.user_id,
            NEW.survey_id,
            NEW.id,
            generate_certificate_id((SELECT title FROM surveys WHERE id = NEW.survey_id)),
            'participation'
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_certificate_on_completion
    AFTER UPDATE ON survey_responses
    FOR EACH ROW
    EXECUTE FUNCTION create_certificate_trigger();

-- Trigger to log analytics events
CREATE OR REPLACE FUNCTION log_analytics_event_trigger()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO analytics_events (
        event_type,
        user_id,
        survey_id,
        event_data
    ) VALUES (
        CASE 
            WHEN TG_OP = 'INSERT' THEN 'survey_started'
            WHEN NEW.status = 'completed' AND OLD.status != 'completed' THEN 'survey_completed'
            WHEN NEW.status = 'abandoned' AND OLD.status != 'abandoned' THEN 'survey_abandoned'
            ELSE 'survey_updated'
        END,
        COALESCE(NEW.user_id, OLD.user_id),
        COALESCE(NEW.survey_id, OLD.survey_id),
        jsonb_build_object(
            'response_id', COALESCE(NEW.id, OLD.id),
            'old_status', OLD.status,
            'new_status', NEW.status,
            'time_spent', NEW.total_time_spent
        )
    );
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER log_survey_analytics
    AFTER INSERT OR UPDATE ON survey_responses
    FOR EACH ROW
    EXECUTE FUNCTION log_analytics_event_trigger();
