-- Hotel Management System Database Schema
-- Version: 1.0
-- Date: 2025-12-22

-- Create database
CREATE DATABASE IF NOT EXISTS hotel_management;
USE hotel_management;

-- Create tables

-- Roles table
CREATE TABLE roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Permissions table
CREATE TABLE permissions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    resource VARCHAR(50) NOT NULL,
    action VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Role-Permission junction table
CREATE TABLE role_permissions (
    role_id BIGINT,
    permission_id BIGINT,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

-- Users table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    role_id BIGINT NOT NULL,
    enabled BOOLEAN DEFAULT TRUE,
    profile_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Departments table
CREATE TABLE departments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    manager_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Staff table
CREATE TABLE staff (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNIQUE NOT NULL,
    employee_id VARCHAR(50) UNIQUE NOT NULL,
    department_id BIGINT NOT NULL,
    position VARCHAR(100) NOT NULL,
    salary DECIMAL(10, 2),
    hire_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    emergency_contact VARCHAR(100),
    emergency_phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- Update departments table to add foreign key constraint for manager_id
ALTER TABLE departments ADD CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES staff(id);

-- Guests table
CREATE TABLE guests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address VARCHAR(255),
    city VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(20),
    document_type VARCHAR(50),
    document_number VARCHAR(50),
    date_of_birth DATE,
    preferences TEXT,
    nationality VARCHAR(100),
    is_vip BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Room Types table
CREATE TABLE room_types (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    base_price DECIMAL(10, 2) NOT NULL,
    capacity INT NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Rooms table
CREATE TABLE rooms (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_number VARCHAR(10) UNIQUE NOT NULL,
    room_type_id BIGINT NOT NULL,
    floor INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    status ENUM('AVAILABLE', 'OCCUPIED', 'MAINTENANCE', 'RESERVED', 'CLEANING') DEFAULT 'AVAILABLE',
    max_occupancy INT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (room_type_id) REFERENCES room_types(id)
);

-- Room Amenities table
CREATE TABLE room_amenities (
    room_id BIGINT,
    amenity VARCHAR(100),
    PRIMARY KEY (room_id, amenity),
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- Room Images table
CREATE TABLE room_images (
    room_id BIGINT,
    image_url VARCHAR(255),
    PRIMARY KEY (room_id, image_url),
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- Reservations table
CREATE TABLE reservations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    reservation_number VARCHAR(50) UNIQUE NOT NULL,
    guest_id BIGINT NOT NULL,
    room_id BIGINT NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    number_of_guests INT NOT NULL,
    status ENUM('PENDING', 'CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT', 'CANCELLED', 'NO_SHOW') DEFAULT 'PENDING',
    total_amount DECIMAL(10, 2) NOT NULL,
    paid_amount DECIMAL(10, 2) DEFAULT 0.00,
    special_requests TEXT,
    actual_check_in_date DATE,
    actual_check_out_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (guest_id) REFERENCES guests(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);

-- Services table
CREATE TABLE services (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category ENUM('RESTAURANT', 'SPA', 'LAUNDRY', 'ROOM_SERVICE', 'TRANSPORT', 'CONFERENCE', 'GYM', 'POOL', 'OTHER') NOT NULL,
    available BOOLEAN DEFAULT TRUE,
    duration INT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Service Bookings table
CREATE TABLE service_bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    service_id BIGINT NOT NULL,
    reservation_id BIGINT NOT NULL,
    booking_date DATETIME NOT NULL,
    status ENUM('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED') DEFAULT 'PENDING',
    quantity INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES services(id),
    FOREIGN KEY (reservation_id) REFERENCES reservations(id)
);

-- Invoices table
CREATE TABLE invoices (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    reservation_id BIGINT NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    tax DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(10, 2) DEFAULT 0.00,
    total_amount DECIMAL(10, 2) NOT NULL,
    issue_date DATETIME NOT NULL,
    due_date DATETIME NOT NULL,
    status ENUM('PENDING', 'SENT', 'PAID', 'OVERDUE', 'CANCELLED') DEFAULT 'PENDING',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (reservation_id) REFERENCES reservations(id)
);

-- Payments table
CREATE TABLE payments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    reservation_id BIGINT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'MOBILE_PAYMENT', 'PAYPAL', 'STRIPE') NOT NULL,
    payment_date DATETIME NOT NULL,
    status ENUM('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED') DEFAULT 'PENDING',
    transaction_id VARCHAR(100) UNIQUE,
    invoice_id BIGINT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (reservation_id) REFERENCES reservations(id),
    FOREIGN KEY (invoice_id) REFERENCES invoices(id)
);

-- Insert default roles
INSERT INTO roles (name, description) VALUES 
('ADMIN', 'Administrator with full access'),
('MANAGER', 'Manager with operational access'),
('RECEPTIONIST', 'Receptionist with front desk access'),
('GUEST', 'Guest with limited access');

-- Insert default permissions
INSERT INTO permissions (name, resource, action, description) VALUES
('VIEW_DASHBOARD', 'dashboard', 'view', 'View dashboard'),
('MANAGE_USERS', 'users', 'manage', 'Manage users'),
('MANAGE_ROOMS', 'rooms', 'manage', 'Manage rooms'),
('MANAGE_RESERVATIONS', 'reservations', 'manage', 'Manage reservations'),
('MANAGE_GUESTS', 'guests', 'manage', 'Manage guests'),
('MANAGE_PAYMENTS', 'payments', 'manage', 'Manage payments'),
('MANAGE_SERVICES', 'services', 'manage', 'Manage services'),
('MANAGE_STAFF', 'staff', 'manage', 'Manage staff'),
('GENERATE_REPORTS', 'reports', 'generate', 'Generate reports');

-- Assign permissions to ADMIN role
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id 
FROM roles r, permissions p 
WHERE r.name = 'ADMIN';

-- Assign permissions to MANAGER role (excluding MANAGE_USERS)
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id 
FROM roles r, permissions p 
WHERE r.name = 'MANAGER' 
AND p.name != 'MANAGE_USERS';

-- Assign permissions to RECEPTIONIST role
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id 
FROM roles r, permissions p 
WHERE r.name = 'RECEPTIONIST' 
AND p.name IN ('VIEW_DASHBOARD', 'MANAGE_RESERVATIONS', 'MANAGE_GUESTS', 'MANAGE_PAYMENTS');

-- Assign permissions to GUEST role
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id 
FROM roles r, permissions p 
WHERE r.name = 'GUEST' 
AND p.name = 'VIEW_DASHBOARD';

-- Insert default room types
INSERT INTO room_types (name, description, base_price, capacity, image_url) VALUES
('Standard Room', 'Comfortable room with essential amenities', 100.00, 2, 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'),
('Deluxe Room', 'Spacious room with premium amenities', 150.00, 3, 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'),
('Suite', 'Luxurious suite with separate living area', 250.00, 4, 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80');

-- Insert sample rooms
INSERT INTO rooms (room_number, room_type_id, floor, price, status, max_occupancy, description) VALUES
('101', 1, 1, 100.00, 'AVAILABLE', 2, 'Standard room with city view'),
('102', 1, 1, 100.00, 'AVAILABLE', 2, 'Standard room with city view'),
('103', 1, 1, 100.00, 'AVAILABLE', 2, 'Standard room with city view'),
('104', 1, 1, 100.00, 'AVAILABLE', 2, 'Standard room with city view'),
('105', 1, 1, 100.00, 'AVAILABLE', 2, 'Standard room with city view'),
('201', 2, 2, 150.00, 'AVAILABLE', 3, 'Deluxe room with balcony'),
('202', 2, 2, 150.00, 'AVAILABLE', 3, 'Deluxe room with balcony'),
('203', 2, 2, 150.00, 'AVAILABLE', 3, 'Deluxe room with balcony'),
('301', 3, 3, 250.00, 'AVAILABLE', 4, 'Luxury suite with panoramic view'),
('302', 3, 3, 250.00, 'AVAILABLE', 4, 'Luxury suite with panoramic view');

-- Insert default departments
INSERT INTO departments (name, description) VALUES
('Front Office', 'Handles guest check-ins, check-outs, and reservations'),
('Housekeeping', 'Maintains cleanliness and upkeep of rooms and facilities'),
('Food & Beverage', 'Manages restaurants, bars, and room service'),
('Maintenance', 'Handles repairs and maintenance of hotel facilities');

-- Insert default services
INSERT INTO services (name, description, price, category, available, duration, image_url) VALUES
('Room Service', '24-hour room service with menu selection', 10.00, 'ROOM_SERVICE', TRUE, 30, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'),
('Spa Treatment', 'Full body massage and relaxation treatment', 120.00, 'SPA', TRUE, 90, 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'),
('Laundry Service', 'Wash, dry, and fold laundry service', 25.00, 'LAUNDRY', TRUE, 480, 'https://images.unsplash.com/photo-1512909006721-06637462b8a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'),
('Airport Transfer', 'Pickup and drop-off service to/from airport', 50.00, 'TRANSPORT', TRUE, 60, 'https://images.unsplash.com/photo-1569516449331-6fc9bc6b0b64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80');