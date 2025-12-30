-- Minimal schema additions for Timesheet entity
CREATE TABLE IF NOT EXISTS timesheets (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  staff_id BIGINT NOT NULL,
  date DATE NOT NULL,
  check_in_time TIME NULL,
  check_out_time TIME NULL,
  hours_worked DOUBLE NULL,
  created_at DATETIME,
  updated_at DATETIME,
  CONSTRAINT fk_timesheet_staff FOREIGN KEY (staff_id) REFERENCES staff(id)
);

