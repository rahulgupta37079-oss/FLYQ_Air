-- Summer Camp Registrations Table
CREATE TABLE IF NOT EXISTS summer_camp_registrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_name TEXT NOT NULL,
  age INTEGER NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  parent_phone TEXT NOT NULL,
  city TEXT NOT NULL,
  school_name TEXT,
  previous_experience TEXT,
  special_requirements TEXT,
  batch_preference TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'pending'
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_camp_email ON summer_camp_registrations(email);
CREATE INDEX IF NOT EXISTS idx_camp_phone ON summer_camp_registrations(phone);
CREATE INDEX IF NOT EXISTS idx_camp_city ON summer_camp_registrations(city);
CREATE INDEX IF NOT EXISTS idx_camp_status ON summer_camp_registrations(status);
CREATE INDEX IF NOT EXISTS idx_camp_created_at ON summer_camp_registrations(created_at);
