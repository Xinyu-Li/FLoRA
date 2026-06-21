# Chat Services Deployment Guide

## Software Requirements

### System Requirements
- **Python Version**: Python 3.10 or higher (Python 3.11 recommended)
- **Memory**: Minimum 4GB RAM (8GB+ recommended)
- **Disk Space**: At least 10GB available space

### Python Dependencies

All dependencies are listed in `requirements.txt`, including:

- **Web Framework**: Flask, gunicorn, gevent
- **AI/NLP**: OpenAI, spacy, nltk, sentence-transformers, torch
- **Data Processing**: numpy, pandas, scipy
- **Text Processing**: pdfminer.six, python-docx, jieba
- **Translation**: googletrans, google-cloud-translate
- **Others**: httpx, requests, python-dotenv

### Additional Models Required

1. **Spacy Language Models** (based on `LABELER_LANGUAGE` in `.env`):
   - English: `en_core_web_sm` or `en_core_web_md`
   - Spanish: `es_core_news_md`
   - French: `fr_core_news_md`
   - German: `de_core_news_md`
   - Portuguese: `pt_core_news_md`
   - Dutch: `nl_core_news_md`

2. **NLTK Data**: `punkt`

---

## Installation Steps

### 1. Create and Activate Virtual Environment

```bash
# Create virtual environment
python3 -m venv .venv

# Activate virtual environment
# Linux/macOS:
source .venv/bin/activate

# Windows:
.venv\Scripts\activate
```

### 2. Install Python Dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 3. Install Spacy Language Models

Install the required language models:

```bash
# English (required)
python -m spacy download en_core_web_sm

# Other languages (install as needed)
python -m spacy download es_core_news_md  # Spanish
python -m spacy download fr_core_news_md  # French
python -m spacy download de_core_news_md  # German
python -m spacy download pt_core_news_md  # Portuguese
python -m spacy download nl_core_news_md  # Dutch
```

### 4. Download NLTK Data

```bash
python -c "import nltk; nltk.download('punkt'); nltk.download('punkt_tab')"
```

### 5. Configure Environment Variables

Edit the `.env` file and configure the necessary environment variables:

```bash
# OpenAI API Keys
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_ORGANIZATION=your_org_id_here

# Labeler language setting (en, es, fr, de, pt, nl, zh, dan, etc.)
LABELER_LANGUAGE=en

# Project-specific API keys
FLORA_BEIJING_TOKYO_ELB1=your_key_here
FLORA_BEIJING_PROJECT_ID=your_project_id_here
```

### 6. Create Required Directories

```bash
mkdir -p uploads logs flask_session
```

---

## Starting the Application

### Development Environment

Use Flask's built-in server (for development/testing only):

```bash
python main.py
```

The application will run at `http://0.0.0.0:5000`.

### Production Environment (Using Gunicorn)

> **Note**: The application runs on port 5000. Your Java application will connect to this port.

**Basic Command**:

```bash
gunicorn -k gevent --bind 0.0.0.0:5000 --workers 4 --threads 8 controller_home:app
```

**Parameter Explanation**:
- `-k gevent`: Use gevent async worker
- `--bind 0.0.0.0:5000`: Bind to port 5000 on all network interfaces
- `--workers 4`: 4 worker processes
- `--threads 8`: 8 threads per worker
- `controller_home:app`: Application entry point

**Running in Background**:

```bash
# Run in background and redirect output to log file
gunicorn -k gevent --bind 0.0.0.0:5000 --workers 4 --threads 8 controller_home:app > logs/gunicorn.log 2>&1 &
```

---

## Managing the Application

### Stopping the Application

```bash
# Find gunicorn processes
ps aux | grep gunicorn

# Stop process (using master PID)
kill -TERM <master_pid>

# Or force stop all gunicorn processes
pkill -f gunicorn
```

### Viewing Logs

```bash
# Flask application logs
tail -f logs/flask-log.log

# Gunicorn logs (if running in background)
tail -f logs/gunicorn.log
```

### Checking Process Status

```bash
# View gunicorn processes
ps aux | grep gunicorn

# Check port usage
netstat -tulpn | grep :5000
# or
lsof -i :5000
```
