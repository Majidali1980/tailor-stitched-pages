-- Make appointment date and time optional since scheduling is now optional
ALTER TABLE appointments 
ALTER COLUMN appointment_date DROP NOT NULL,
ALTER COLUMN appointment_time DROP NOT NULL;