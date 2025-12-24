package com.hotelmanagement.repository;

import com.hotelmanagement.model.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Long> {
	java.util.Optional<Permission> findByName(String name);
}