package com.hotelmanagement.controller;

import com.hotelmanagement.service.BackupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/backup")
@CrossOrigin(origins = "*")
public class BackupController {

    @Autowired
    private BackupService backupService;

    @PostMapping("/create")
    public ResponseEntity<String> createBackup() {
        try {
            backupService.createDatabaseBackup();
            return ResponseEntity.ok("Backup created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Backup failed: " + e.getMessage());
        }
    }

    @GetMapping("/directory")
    public ResponseEntity<String> getBackupDirectory() {
        return ResponseEntity.ok(backupService.getBackupDirectory());
    }

    @PutMapping("/directory")
    public ResponseEntity<String> setBackupDirectory(@RequestParam String directory) {
        backupService.setBackupDirectory(directory);
        return ResponseEntity.ok("Backup directory updated to: " + directory);
    }
}