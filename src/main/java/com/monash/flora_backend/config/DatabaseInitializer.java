package com.monash.flora_backend.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

/**
 * Database Initializer - Automatically creates databases and executes SQL files if needed
 * @author Xinyu Li
 * @date 2025-12-18
 */
@Slf4j
@Component
@Order(1) // Execute before other CommandLineRunner beans
public class DatabaseInitializer implements CommandLineRunner {

    @Value("${database.auto-init.enabled:true}")
    private boolean autoInitEnabled;

    @Value("${spring.datasource.dynamic.datasource.master.url}")
    private String masterUrl;

    @Value("${spring.datasource.dynamic.datasource.master.username}")
    private String username;

    @Value("${spring.datasource.dynamic.datasource.master.password}")
    private String password;

    @Value("${spring.datasource.dynamic.datasource.slave_1.url}")
    private String slaveUrl;

    private static final String FLORA_DB_NAME = "flora_annotation";
    private static final String MOODLE_DB_NAME = "moodle";

    // SQL files are located in the project's sql directory
    // Will try to read from: 1) Absolute path, 2) Relative to project root, 3) Classpath
    private static final String FLORA_SQL_FILE = "sql/flora_annotation_2025_08_28_full.sql";
    private static final String MOODLE_SQL_FILE = "sql/moodle.sql";

    @Override
    public void run(String... args) throws Exception {
        if (!autoInitEnabled) {
            log.info("Database auto-initialization is disabled. Skipping...");
            return;
        }

        log.info("========== Database Initialization Started ==========");

        // Extract MySQL server connection URL (without database name)
        String serverUrl = extractServerUrl(masterUrl);

        try (Connection connection = DriverManager.getConnection(serverUrl, username, password)) {
            log.info("Successfully connected to MySQL server at: {}", serverUrl);

            // Check and initialize flora_annotation database
            if (!databaseExists(connection, FLORA_DB_NAME)) {
                log.warn("Database '{}' does not exist. Creating now...", FLORA_DB_NAME);
                createDatabase(connection, FLORA_DB_NAME);
                log.info("Database '{}' created successfully", FLORA_DB_NAME);

                // Execute SQL file for flora_annotation
                executeSqlFile(FLORA_DB_NAME, FLORA_SQL_FILE);
            } else {
                log.info("Database '{}' already exists. Skipping initialization.", FLORA_DB_NAME);
            }

            // Check and initialize moodle database
            if (!databaseExists(connection, MOODLE_DB_NAME)) {
                log.warn("Database '{}' does not exist. Creating now...", MOODLE_DB_NAME);
                createDatabase(connection, MOODLE_DB_NAME);
                log.info("Database '{}' created successfully", MOODLE_DB_NAME);

                // Execute SQL file for moodle
                executeSqlFile(MOODLE_DB_NAME, MOODLE_SQL_FILE);
            } else {
                log.info("Database '{}' already exists. Skipping initialization.", MOODLE_DB_NAME);
            }

            log.info("========== Database Initialization Completed ==========");

        } catch (Exception e) {
            log.error("Failed to initialize databases", e);
            throw new RuntimeException("Database initialization failed", e);
        }
    }

    /**
     * Extract MySQL server URL without database name
     */
    private String extractServerUrl(String jdbcUrl) {
        // Example: jdbc:mysql://127.0.0.1:3306/flora_annotation?... -> jdbc:mysql://127.0.0.1:3306/?...
        int dbNameStart = jdbcUrl.lastIndexOf("/") + 1;
        int dbNameEnd = jdbcUrl.indexOf("?");
        if (dbNameEnd == -1) {
            dbNameEnd = jdbcUrl.length();
        }
        return jdbcUrl.substring(0, dbNameStart) + jdbcUrl.substring(dbNameEnd);
    }

    /**
     * Check if database exists
     */
    private boolean databaseExists(Connection connection, String databaseName) throws Exception {
        try (Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery("SHOW DATABASES LIKE '" + databaseName + "'")) {
            return resultSet.next();
        }
    }

    /**
     * Create database
     */
    private void createDatabase(Connection connection, String databaseName) throws Exception {
        try (Statement statement = connection.createStatement()) {
            statement.executeUpdate("CREATE DATABASE IF NOT EXISTS `" + databaseName + "` " +
                    "CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        }
    }

    /**
     * Execute SQL file to initialize database
     */
    private void executeSqlFile(String databaseName, String sqlFilePath) {
        log.info("Executing SQL file: {} for database: {}", sqlFilePath, databaseName);

        String serverUrl = extractServerUrl(masterUrl);
        String dbUrl = serverUrl.replace("?", databaseName + "?");

        try (Connection connection = DriverManager.getConnection(dbUrl, username, password);
             Statement statement = connection.createStatement()) {

            BufferedReader reader = null;

            // Try multiple locations to find the SQL file
            // Priority order: 1) Classpath (for JAR packaging), 2) Project root, 3) Current directory

            // 1. Try from classpath first (will work when packaged in JAR)
            try {
                log.info("Attempting to read SQL file from classpath: {}", sqlFilePath);
                ClassPathResource resource = new ClassPathResource(sqlFilePath);
                if (resource.exists()) {
                    log.info("Reading SQL file from classpath (resources): {}", sqlFilePath);
                    reader = new BufferedReader(new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8));
                }
            } catch (Exception e) {
                log.debug("SQL file not found in classpath, trying file system...");
            }

            // 2. If not found in classpath, try project root directory
            if (reader == null) {
                String projectRoot = System.getProperty("user.dir");
                File projectSqlFile = new File(projectRoot, sqlFilePath);
                if (projectSqlFile.exists()) {
                    log.info("Reading SQL file from project root: {}", projectSqlFile.getAbsolutePath());
                    reader = new BufferedReader(new FileReader(projectSqlFile, StandardCharsets.UTF_8));
                }
            }

            // 3. If still not found, try current working directory
            if (reader == null) {
                File sqlFile = new File(sqlFilePath);
                if (sqlFile.exists()) {
                    log.info("Reading SQL file from current directory: {}", sqlFile.getAbsolutePath());
                    reader = new BufferedReader(new FileReader(sqlFile, StandardCharsets.UTF_8));
                }
            }

            // If file not found in any location, throw error
            if (reader == null) {
                String projectRoot = System.getProperty("user.dir");
                log.error("SQL file not found in any location: {}", sqlFilePath);
                log.error("Tried locations: 1) classpath:{}, 2) {}, 3) {}",
                        sqlFilePath,
                        new File(projectRoot, sqlFilePath).getAbsolutePath(),
                        new File(sqlFilePath).getAbsolutePath());
                throw new RuntimeException("SQL file not found: " + sqlFilePath);
            }

            StringBuilder sqlBuilder = new StringBuilder();
            String line;
            int executedStatements = 0;

            while ((line = reader.readLine()) != null) {
                // Skip comments and empty lines
                line = line.trim();
                if (line.isEmpty() || line.startsWith("--") || line.startsWith("#")) {
                    continue;
                }

                sqlBuilder.append(line).append(" ");

                // Execute when we encounter a semicolon
                if (line.endsWith(";")) {
                    String sql = sqlBuilder.toString().trim();
                    if (!sql.isEmpty()) {
                        try {
                            statement.execute(sql);
                            executedStatements++;

                            if (executedStatements % 100 == 0) {
                                log.info("Executed {} SQL statements...", executedStatements);
                            }
                        } catch (Exception e) {
                            log.warn("Failed to execute SQL statement (skipping): {}", sql.substring(0, Math.min(100, sql.length())));
                            log.debug("SQL execution error details", e);
                        }
                    }
                    sqlBuilder.setLength(0);
                }
            }

            reader.close();
            log.info("Successfully executed {} SQL statements from file: {}", executedStatements, sqlFilePath);

        } catch (Exception e) {
            log.error("Failed to execute SQL file: {}", sqlFilePath, e);
            throw new RuntimeException("SQL file execution failed: " + sqlFilePath, e);
        }
    }
}
