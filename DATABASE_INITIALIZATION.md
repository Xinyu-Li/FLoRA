# Database Auto-Initialization

This document explains the automatic database initialization feature added to the FLoRA Backend application.

## Overview

The `DatabaseInitializer` component automatically checks and initializes the required databases when the application starts. If the databases don't exist, it will:
1. Create the `flora_annotation` and `moodle` databases
2. Execute the corresponding SQL files to populate the databases with schema and data

## Features

- **Automatic Database Creation**: Creates databases if they don't exist
- **SQL File Execution**: Automatically executes initialization SQL files
- **Intelligent File Location**: Searches for SQL files in multiple locations
- **Configurable**: Can be enabled/disabled via configuration
- **Safe**: Only initializes databases that don't exist (won't overwrite existing data)
- **Error Handling**: Provides detailed logging and error messages

## Configuration

### Enable/Disable Auto-Initialization

Edit `src/main/resources/application.yml`:

```yaml
database:
  auto-init:
    enabled: true  # Set to false to disable automatic database initialization
```

### SQL Files

The following SQL files are used for initialization:

1. **flora_annotation database**: `sql/flora_annotation_2025_08_28_full.sql`
2. **moodle database**: `sql/monash_moodle_2024_07_29.sql`

**Location**: SQL files are stored in `src/main/resources/sql/` and will be packaged into the JAR file.

## SQL File Locations

The system searches for SQL files in the following priority order:

1. **Classpath (resources folder)** - *Preferred* - Works when packaged in JAR
2. Project root directory (`user.dir` system property + relative path) - For development
3. Current working directory (relative path) - Fallback

Example file locations that will be checked:
1. `classpath:sql/flora_annotation_2025_08_28_full.sql` (inside JAR or resources folder)
2. `D:\develop\FLoRA_backend\sql\flora_annotation_2025_08_28_full.sql` (project root)
3. `sql/flora_annotation_2025_08_28_full.sql` (current directory)

## How It Works

### Initialization Process

When the application starts:

1. **Check if auto-init is enabled**
   - If disabled, skip all initialization steps

2. **Connect to MySQL server**
   - Uses credentials from `application.yml`
   - Connects without specifying a database

3. **Check flora_annotation database**
   - If exists: Skip initialization
   - If not exists: Create database and execute SQL file

4. **Check moodle database**
   - If exists: Skip initialization
   - If not exists: Create database and execute SQL file

5. **Complete**
   - Log summary of initialization results

### Execution Order

The `DatabaseInitializer` uses `@Order(1)` to ensure it runs **before** other `CommandLineRunner` beans in the application. This ensures databases are ready before the application tries to use them.

## Logging

The initializer provides detailed logging:

```
INFO - ========== Database Initialization Started ==========
INFO - Successfully connected to MySQL server at: jdbc:mysql://127.0.0.1:3306/
INFO - Database 'flora_annotation' does not exist. Creating now...
INFO - Database 'flora_annotation' created successfully
INFO - Executing SQL file: sql/flora_annotation_2025_08_28_full.sql for database: flora_annotation
INFO - Attempting to read SQL file from classpath: sql/flora_annotation_2025_08_28_full.sql
INFO - Reading SQL file from classpath (resources): sql/flora_annotation_2025_08_28_full.sql
INFO - Executed 100 SQL statements...
INFO - Successfully executed 532 SQL statements from file: sql/flora_annotation_2025_08_28_full.sql
INFO - Database 'moodle' already exists. Skipping initialization.
INFO - ========== Database Initialization Completed ==========
```

**Note**: When running from JAR, you'll see "Reading SQL file from classpath (resources)" which confirms the SQL files are being read from inside the JAR file.

## Error Handling

### SQL File Not Found

If SQL files cannot be found:
```
ERROR - SQL file not found in any location: sql/flora_annotation_2025_08_28_full.sql
ERROR - Tried locations: 1) classpath:sql/..., 2) D:\..., 3) ...
```

**Solution**:
- Ensure SQL files are in `src/main/resources/sql/` before building
- Rebuild the JAR: `mvn clean package`
- Verify files are in the JAR: `jar tf target/FLoRA_backend-2.6.1.jar | grep sql`

### Database Connection Failed

If MySQL connection fails:
```
ERROR - Failed to initialize databases
```

**Solution**:
- Check MySQL is running
- Verify credentials in `application.yml`
- Ensure MySQL is accessible at `127.0.0.1:3306`

### SQL Execution Errors

Individual SQL statement failures are logged but don't stop the process:
```
WARN - Failed to execute SQL statement (skipping): CREATE TABLE ...
```

## Testing the Feature

### First-Time Setup

1. **Ensure MySQL is running**
   ```bash
   # Using Docker
   docker run -d -p 3306:3306 --name mysql_container -e MYSQL_ROOT_PASSWORD=1q2w3e4R mysql:latest
   ```

2. **SQL files are already packaged**
   - SQL files are in `src/main/resources/sql/` and will be automatically included in the JAR
   - No need to copy SQL files separately when deploying

3. **Enable auto-initialization in application.yml** (enabled by default)
   ```yaml
   database:
     auto-init:
       enabled: true
   ```

4. **Run the application**
   ```bash
   "D:\Program Files\JDK11\bin\java.exe" -jar target\FLoRA_backend-2.6.1.jar
   ```

5. **Check logs**
   - Look for "Database Initialization" messages
   - Should see: `Reading SQL file from classpath (resources): sql/...`
   - Verify databases were created successfully

### Deployment (Production)

When deploying to production, you only need the JAR file:

```bash
# 1. Build the JAR (SQL files will be included automatically)
mvn clean package

# 2. Deploy just the JAR file
scp target/FLoRA_backend-2.6.1.jar user@server:/path/to/deployment/

# 3. Run on server
java -jar FLoRA_backend-2.6.1.jar
```

**No need to copy SQL files separately** - they're already inside the JAR!

### Testing with Existing Databases

If databases already exist, the initializer will detect them and skip:

```
INFO - Database 'flora_annotation' already exists. Skipping initialization.
INFO - Database 'moodle' already exists. Skipping initialization.
```

### Manual Database Cleanup (for testing)

To test the initialization again:

```sql
DROP DATABASE IF EXISTS flora_annotation;
DROP DATABASE IF EXISTS moodle;
```

Then restart the application.

## Disabling Auto-Initialization

If you want to manage databases manually:

1. Set `database.auto-init.enabled: false` in `application.yml`
2. Manually create and initialize databases before starting the application
3. Rebuild the JAR after changing configuration

## Troubleshooting

### Issue: Application fails to start with database errors

**Cause**: Databases don't exist and auto-init is disabled

**Solution**: Enable auto-init or manually create databases

### Issue: SQL file execution is slow

**Cause**: Large SQL files with many statements

**Solution**: This is normal. Progress is logged every 100 statements. Wait for completion.

### Issue: Some SQL statements fail during execution

**Cause**: SQL statements may have dependencies or syntax issues

**Solution**: Check the WARN logs for failed statements. Most failures are non-critical (e.g., "table already exists").

## Implementation Details

### Code Location

- **Main class**: `com.monash.flora_backend.config.DatabaseInitializer`
- **Configuration**: `src/main/resources/application.yml`

### Key Methods

- `databaseExists()`: Checks if a database exists
- `createDatabase()`: Creates a new database with UTF-8 charset
- `executeSqlFile()`: Reads and executes SQL statements from a file
- `extractServerUrl()`: Extracts MySQL server URL without database name

### Database Charset

Databases are created with:
- Character Set: `utf8mb4`
- Collation: `utf8mb4_unicode_ci`

This ensures proper support for international characters and emojis.

## Related Configuration

See `SOFTWARE_REQUIREMENTS.md` for complete software requirements including MySQL version and configuration details.

## Questions or Issues?

Contact: xinyu.li1@monash.edu
