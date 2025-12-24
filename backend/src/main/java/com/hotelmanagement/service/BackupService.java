package com.hotelmanagement.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class BackupService {

    @Value("${spring.datasource.url}")
    private String databaseUrl;

    @Value("${spring.datasource.username}")
    private String databaseUsername;

    @Value("${spring.datasource.password}")
    private String databasePassword;

    @Value("${backup.directory:C:/backups/hotel-management}")
    private String backupDirectory;

    /**
     * Creates a backup of the database
     */
    public void createDatabaseBackup() throws IOException, InterruptedException {
        // Ensure backup directory exists
        Path backupPath = Paths.get(backupDirectory);
        if (!Files.exists(backupPath)) {
            Files.createDirectories(backupPath);
        }

        // Extract database name from URL
        String databaseName = extractDatabaseName(databaseUrl);
        
        // Generate backup filename with timestamp
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
        String backupFileName = String.format("hotel_backup_%s.sql", timestamp);
        Path backupFile = backupPath.resolve(backupFileName);

        // Build mysqldump command
        ProcessBuilder processBuilder = new ProcessBuilder();
        processBuilder.command("mysqldump", 
                              "-u", databaseUsername, 
                              "-p" + databasePassword, 
                              databaseName);

        // Redirect output to file
        processBuilder.redirectOutput(backupFile.toFile());
        
        // Execute the command
        Process process = processBuilder.start();
        int exitCode = process.waitFor();

        if (exitCode != 0) {
            throw new RuntimeException("Database backup failed with exit code: " + exitCode);
        }
    }

    /**
     * Scheduled backup (runs daily at 2 AM)
     */
    @Scheduled(cron = "0 0 2 * * ?")
    public void scheduledBackup() {
        try {
            createDatabaseBackup();
            System.out.println("Scheduled backup completed successfully at " + LocalDateTime.now());
        } catch (Exception e) {
            System.err.println("Scheduled backup failed: " + e.getMessage());
        }
    }

    /**
     * Extract database name from JDBC URL
     */
    private String extractDatabaseName(String url) {
        // Example: jdbc:mysql://localhost:3306/hotel_management
        int lastSlashIndex = url.lastIndexOf('/');
        int queryParamsIndex = url.indexOf('?', lastSlashIndex);
        
        if (queryParamsIndex == -1) {
            return url.substring(lastSlashIndex + 1);
        } else {
            return url.substring(lastSlashIndex + 1, queryParamsIndex);
        }
    }

    /**
     * Get backup directory path
     */
    public String getBackupDirectory() {
        return backupDirectory;
    }

    /**
     * Set backup directory path
     */
    public void setBackupDirectory(String backupDirectory) {
        this.backupDirectory = backupDirectory;
    }
}