# FLoRA Backend - Software Requirements

This document outlines all software requirements needed to run the FLoRA Backend application (version 2.6.1).

## Recommended IDE (Highly Recommended)

### JetBrains IntelliJ IDEA

We highly recommend using **JetBrains IntelliJ IDEA** for viewing code, running tests, and developing the FLoRA Backend application.

- **Version**: IntelliJ IDEA Community Edition (Free) or Ultimate Edition
- **Download**: [IntelliJ IDEA Download](https://www.jetbrains.com/idea/download/)

**Example - Running COPES Model Tests:**

The test file `src/test/java/com/monash/flora_backend/CopesProcessTest.java` contains comprehensive tests for the COPES (Cognitive, Operational, Physical, Emotional, Social) model process detection. You can:

1. Open the test file in IntelliJ IDEA
2. Click the green play button next to any test method to run it
3. View detailed test output showing:
   - Which COPES processes were detected (CSAR1, CMTC1, CPI1, OS1, etc.)
   - Process labels for each action
   - Detection differences between BEFORE_5MIN and AFTER_5MIN patterns
4. Debug tests with breakpoints to understand the process detection logic

**Installation Steps:**

1. Download IntelliJ IDEA from the link above
2. Run the installer and follow the setup wizard
3. Open the FLoRA Backend project:
   - File → Open → Select `Yourpath\FLoRA_backend`
4. Wait for IntelliJ to index the project and download dependencies
5. Navigate to test files and run them directly from the IDE

### JetBrains PyCharm

If you need to work with Python scripts or data analysis, we also recommend **JetBrains PyCharm**:
- **Download**: [PyCharm Download](https://www.jetbrains.com/pycharm/download/)
- PyCharm provides similar benefits for Python development

**Installation Steps for PyCharm:**
1. Download PyCharm from the link above
2. Run the installer and follow the setup wizard
3. Open Python projects or scripts within PyCharm for better development experience

### Docker Desktop

Docker Desktop simplifies the installation and management of all required services (MySQL, Redis, Kafka, Elasticsearch) through containers.

- **Version**: Latest stable version
- **Download**:
  - **Windows**: [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)
  - **Mac**: [Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)
  - **Linux**: [Docker Engine for Linux](https://docs.docker.com/engine/install/)

- **System Requirements**:
  - **Windows**: Windows 10 64-bit (Pro, Enterprise, or Education) or Windows 11
  - **Mac**: macOS 10.15 or newer
  - **Linux**: 64-bit version of Ubuntu, Debian, Fedora, or CentOS

- **Installation Steps**:
  1. Download Docker Desktop from the link above
  2. Run the installer and follow the installation wizard
  3. Start Docker Desktop
  4. Verify installation:
     ```bash
     docker --version
     docker run hello-world
     ```

- **Post-Installation Configuration** (Windows):
  - Ensure WSL 2 is enabled (Docker Desktop will prompt if needed)
  - Allocate sufficient resources in Docker Desktop settings:
    - Memory: At least 4 GB (recommended: 8 GB)
    - CPUs: At least 2 cores (recommended: 4 cores)
    - Disk: At least 20 GB

- **Note**: If you choose to install Docker Desktop, you can use the Docker installation commands provided in the Required Software sections below instead of installing each service individually.

## Required Software

### 1. Java Development Kit (JDK)
- **Version**: JDK 11
- **Download**: [OpenJDK 11](https://docs.aws.amazon.com/corretto/latest/corretto-11-ug/downloads-list.html)

- **Environment Variables Configuration** (Required):

  After installation, you need to configure the following environment variables:

  **Windows:**
  1. Right-click "This PC" → "Properties" → "Advanced system settings" → "Environment Variables"
  2. Add/Edit System Variables:
     - **JAVA_HOME**: Set to JDK installation directory
       - Example: `D:\Program Files\JDK11`
     - **Path**: Add `%JAVA_HOME%\bin` to the Path variable
       - Example: Add `D:\Program Files\JDK11\bin`
  3. Click "OK" to save all changes
  4. **Important**: Close and reopen any command prompt/terminal windows for changes to take effect

  **Linux/Mac:**
  Add these lines to your `~/.bashrc`, `~/.zshrc`, or `~/.bash_profile`:
  ```bash
  export JAVA_HOME=/path/to/jdk11
  export PATH=$JAVA_HOME/bin:$PATH
  ```
  Then reload the configuration:
  ```bash
  source ~/.bashrc  # or ~/.zshrc or ~/.bash_profile
  ```

- **Verification**:
  Open a **new** terminal/command prompt window and run:
  ```bash
  java -version
  echo %JAVA_HOME%   # Windows
  echo $JAVA_HOME    # Linux/Mac
  ```
  Expected output:
  - `java version "11.x.x"`
  - JAVA_HOME should show your JDK installation path

### 2. Python Flask Service (chat-services)

This project includes a **Python Flask service** that handles all **AI-related processing** alongside the main Java backend.

**Key Information:**
- **Purpose**: Handles all AI-related processing (NLP, machine learning, chatbot functionality, etc.)
- **Requirement**: Must be started **together with** the Java Spring application
- **Default Port**: **5000**
- **Integration**: The Java Spring application automatically connects to the Flask service on port 5000

**Important**: The Flask service is **required** for full functionality. Without it, AI-related features will not work.

**For detailed setup instructions**, please refer to:
- **Documentation**: [PYTHON_SOFTWARE_REQUIREMENTS.md](PYTHON_SOFTWARE_REQUIREMENTS.md)

The Flask service documentation covers:
- Python environment setup and dependencies
- Flask service configuration
- Running and deploying the Flask service
- API endpoints and integration with the main backend
- Troubleshooting and common issues

**Note**: The Python Flask service is a separate component and requires independent setup from the main Java application.

### 3. MySQL Database
- **Version**: 8.0.13 or higher
- **Required Databases**:
  - `flora_annotation` (main database)
  - `moodle` (secondary database)
- **Configuration**:
  - Host: `127.0.0.1`
  - Port: `3306`
  - Username: `root`
  - Password: `1q2w3e4R`
- **Download**: [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- **Docker Installation (Highly Recommended)**:
  ```bash
  docker run -d -p 3306:3306 --name mysql_container -e MYSQL_ROOT_PASSWORD=1q2w3e4R mysql:latest
  ```
- **Verification**:
  ```bash
  mysql --version
  ```

### 4. Redis
- **Version**: 5.0 or higher (recommended: latest stable)
- **Configuration**:
  - Host: `localhost`
  - Port: `6379`
  - Database: `0`
- **Download**:
  - Windows: [Redis for Windows](https://github.com/tporadowski/redis/releases)
  - Linux/Mac: [Redis Official](https://redis.io/download)
- **Docker Installation (Highly Recommended)**:
  ```bash
  docker run --name my-redis -d -p 6379:6379 redis
  ```
- **Verification**:
  ```bash
  redis-cli ping
  ```
  Expected output: `PONG`

### 5. Apache Kafka
- **Version**: 3.7.0 (compatible with Spring Boot 2.7.3)
- **Configuration**:
  - Bootstrap Servers: `127.0.0.1:9092`
  - Consumer Group: `test-consumer-group`
- **Download**: [Apache Kafka](https://kafka.apache.org/downloads)
- **Docker Installation (Highly Recommended)**:

  **Option 1: Kafka with Zookeeper (Recommended for compatibility)**

  First, install Zookeeper:
  ```bash
  # Automatic restart
  docker run -d --restart=always --log-driver json-file --log-opt max-size=100m --log-opt max-file=2 --name zookeeper -p 2181:2181 -v /etc/localtime:/etc/localtime zookeeper

  # Manual restart
  docker run -d --log-driver json-file --log-opt max-size=100m --log-opt max-file=2 --name zookeeper -p 2181:2181 -v /etc/localtime:/etc/localtime zookeeper
  ```

  Then install Kafka (replace `192.168.1.5` with your machine IP address):
  ```bash
  docker run -d --log-driver json-file --log-opt max-size=100m --log-opt max-file=2 --name kafka -p 9092:9092 -e KAFKA_BROKER_ID=0 -e KAFKA_ZOOKEEPER_CONNECT=192.168.1.5:2181/kafka -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://192.168.1.5:9092 -e ALLOW_PLAINTEXT_LISTENER=yes -e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 -v /etc/localtime:/etc/localtime bitnami/kafka:3.7
  ```
- **Verification**:
  ```bash
  # Check if Kafka is running
  netstat -an | findstr "9092"
  ```

### 6. Elasticsearch
- **Version**: Compatible with Spring Boot 2.7.3 (recommended: 7.x)
- **Configuration**:
  - Host: `127.0.0.1`
  - Index Names: `annotation`
- **Note**: Can be temporarily disabled for testing
- **Download**: [Elasticsearch](https://www.elastic.co/downloads/elasticsearch)
- **Docker Installation (Highly Recommended)**:
  ```bash
  docker run --name elasticsearch-instance -d -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.15.0
  ```

## Running the Application

### Prerequisites Checklist

Before starting the application, ensure the following services are running:

- [ ] MySQL database
- [ ] Redis server
- [ ] Kafka server (including Zookeeper if required)
- [ ] Elasticsearch
- [ ] **Python Flask service (chat-services)** - Must be running on port 5000

### Start Commands

**Important**: You need to start **TWO** applications:

#### 1. Start Python Flask Service First

See [PYTHON_SOFTWARE_REQUIREMENTS.md](PYTHON_SOFTWARE_REQUIREMENTS.md) for detailed instructions.

Quick start (example):
```bash
cd chat-services
python app.py
```

The Flask service should start on **port 5000**.

#### 2. Start Java Spring Application

**Note**: Ensure you have configured JAVA_HOME and PATH environment variables as described in the JDK section above.

Basic command:
```bash
java -jar target\FLoRA_backend-2.6.1.jar
```

With custom memory settings (recommended for production):
```bash
java -Xmx2g -Xms512m -jar target\FLoRA_backend-2.6.1.jar
```

**Alternative** (if environment variables are not configured):
```bash
"D:\Program Files\JDK11\bin\java.exe" -jar target\FLoRA_backend-2.6.1.jar
```

### Accessing the Application

Once both services are started successfully, access the application at:
- **Test Page**: `http://localhost:8080/test`
- **Python Flask Service**: `http://localhost:5000` (for direct API access)


## Technology Stack

- **Framework**: Spring Boot 2.7.3
- **Java Version**: 11
- **Build Tool**: Maven 3.x
- **Database ORM**: MyBatis Plus 3.2.0
- **Connection Pool**: Druid 1.2.21
- **Security**: Spring Security
- **WebSocket**: Spring WebSocket
- **Template Engine**: Thymeleaf
- **Caching**: Redis (Jedis client)
- **Message Queue**: Spring Kafka
- **Search Engine**: Spring Data Elasticsearch
- **AI Service**: Python Flask (chat-services)

## Additional Dependencies

- **Email**: Spring Mail (SMTP via Gmail)
- **Utilities**: Hutool 5.8.15
- **Excel Processing**: EasyExcel 3.1.1
- **NLP**: Apache OpenNLP 2.0.0
- **Translation**: Google Cloud Translate 2.13.0
- **Collaborative Editing**: Etherpad Lite Client 1.2.13

## Contact

For questions or issues, contact: xinyu.li1@monash.edu

## Related Links

- Project Website: https://www.floraengine.org/home
- Version: 2.6.1
