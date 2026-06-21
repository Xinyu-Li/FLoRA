# SQL Files Migration Summary

## Changes Made

SQL files have been moved to the `resources` folder to be packaged into the JAR file for easier deployment.

## What Changed

### 1. File Locations

**Before:**
```
D:\develop\FLoRA_backend\
  └── sql\
      ├── flora_annotation_2025_08_28_full.sql
      └── monash_moodle_2024_07_29.sql
```

**After:**
```
D:\develop\FLoRA_backend\
  ├── sql\  (original files still exist)
  │   ├── flora_annotation_2025_08_28_full.sql
  │   └── monash_moodle_2024_07_29.sql
  └── src\main\resources\
      └── sql\  (NEW - will be packaged into JAR)
          ├── flora_annotation_2025_08_28_full.sql
          └── monash_moodle_2024_07_29.sql
```

### 2. Code Changes

**File**: `src/main/java/com/monash/flora_backend/config/DatabaseInitializer.java`

**Updated search priority order:**
1. ✅ **Classpath (resources)** - *First priority* - Works in JAR
2. Project root directory - Fallback for development
3. Current working directory - Final fallback

**Key improvement:**
```java
// 1. Try from classpath first (will work when packaged in JAR)
try {
    ClassPathResource resource = new ClassPathResource(sqlFilePath);
    if (resource.exists()) {
        reader = new BufferedReader(...);
    }
} catch (Exception e) {
    // Fall back to file system...
}
```

### 3. Documentation Updates

**File**: `DATABASE_INITIALIZATION.md`

Updated to reflect:
- SQL files are now in resources folder
- Files will be packaged into JAR automatically
- Deployment is simpler (just deploy the JAR)
- Updated logging examples
- Updated troubleshooting guide

## Benefits

### ✅ Easier Deployment
- **Before**: Had to copy JAR + SQL files separately
- **After**: Just deploy the JAR file - SQL files are inside

### ✅ No Missing Files
- SQL files are guaranteed to be available (packaged in JAR)
- No risk of forgetting to copy SQL files during deployment

### ✅ Version Control
- SQL files travel with the application version
- No confusion about which SQL version to use

### ✅ Cleaner Deployment
- Single artifact to deploy (JAR file)
- No additional files to manage

## File Sizes

```
flora_annotation_2025_08_28_full.sql:  ~24 KB
monash_moodle_2024_07_29.sql:         ~46 MB
Total:                                 ~46 MB
```

**Note**: The moodle SQL file is quite large (46 MB). This will be included in the JAR file.

## How to Build

### Build JAR with SQL files included:

```bash
mvn clean package
```

The SQL files in `src/main/resources/sql/` will automatically be packaged into the JAR.

### Verify SQL files are in JAR:

```bash
jar tf target/FLoRA_backend-2.6.1.jar | findstr sql
```

Expected output:
```
BOOT-INF/classes/sql/flora_annotation_2025_08_28_full.sql
BOOT-INF/classes/sql/monash_moodle_2024_07_29.sql
```

## Deployment Instructions

### Before (Old Method)
```bash
# 1. Build JAR
mvn clean package

# 2. Copy JAR to server
scp target/FLoRA_backend-2.6.1.jar server:/path/

# 3. Copy SQL files to server
scp -r sql/ server:/path/sql/

# 4. Run on server
java -jar FLoRA_backend-2.6.1.jar
```

### After (New Method - Simpler!)
```bash
# 1. Build JAR (SQL files included automatically)
mvn clean package

# 2. Copy JAR to server
scp target/FLoRA_backend-2.6.1.jar server:/path/

# 3. Run on server - That's it!
java -jar FLoRA_backend-2.6.1.jar
```

## Testing

### Test that SQL files are loaded from JAR:

1. Build the JAR:
   ```bash
   mvn clean package
   ```

2. Run the JAR:
   ```bash
   java -jar target/FLoRA_backend-2.6.1.jar
   ```

3. Check logs for:
   ```
   INFO - Attempting to read SQL file from classpath: sql/flora_annotation_2025_08_28_full.sql
   INFO - Reading SQL file from classpath (resources): sql/flora_annotation_2025_08_28_full.sql
   ```

   If you see "Reading SQL file from classpath (resources)", it confirms files are being read from inside the JAR.

## Backwards Compatibility

The code still supports reading SQL files from the file system as a fallback:

1. **Classpath (JAR)** - Tried first
2. **Project root** - If classpath fails
3. **Current directory** - If both fail

This means:
- ✅ Works with JAR deployment (reads from JAR)
- ✅ Works with development (reads from resources)
- ✅ Works with old deployments (reads from file system)

## Rollback (If Needed)

If you need to revert to the old behavior:

1. Remove SQL files from resources:
   ```bash
   rmdir /s "src\main\resources\sql"
   ```

2. The code will automatically fall back to reading from project root `sql/` folder

3. Rebuild:
   ```bash
   mvn clean package
   ```

## Notes

- Original SQL files in `D:\develop\FLoRA_backend\sql\` are still there (not deleted)
- You can safely delete them if you want, as they're now in `src/main/resources/sql/`
- The resources folder files will be used for all builds going forward

## Questions or Issues?

Contact: xinyu.li1@monash.edu

## Related Files

- `src/main/java/com/monash/flora_backend/config/DatabaseInitializer.java` - Initialization logic
- `src/main/resources/sql/` - SQL files location
- `DATABASE_INITIALIZATION.md` - Full documentation
- `SOFTWARE_REQUIREMENTS.md` - Software requirements
