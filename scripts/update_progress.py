# scripts/update_progress.py
# Appends a daily row to PROGRESS.md with last-24h git activity.
# Timezone: Europe/Berlin. Safe if run multiple times per day.

import os
import sys
import subprocess
import datetime
import pytz

REPO_ROOT = os.path.dirname(os.path.dirname(__file__))
PROGRESS = os.path.join(REPO_ROOT, "PROGRESS.md")

# ---- Config (optional) -------------------------------------------------------
# Count only a subfolder (e.g., "src"). Leave empty to count the whole repo.
FILTER_PATH = os.getenv("PROGRESS_FILTER_PATH", "").strip()  # e.g., "src"
SINCE_HOURS = int(os.getenv("PROGRESS_SINCE_HOURS", "24"))
# -----------------------------------------------------------------------------

def sh(cmd):
    """Run a shell command and return stdout (str)."""
    return subprocess.check_output(cmd, text=True, cwd=REPO_ROOT).strip()

def berlin_today():
    tz = pytz.timezone("Europe/Berlin")
    return datetime.datetime.now(tz).strftime("%Y-%m-%d")

def ensure_header():
    if not os.path.exists(PROGRESS):
        with open(PROGRESS, "w", encoding="utf-8") as f:
            f.write("# GazaarY — Progress Log\n\n")
            f.write("| Date | Commits | Files Changed | Lines +/- | Built | Fixed | Next | Dedication | Comprehension | Resilience |\n")
            f.write("|---|---:|---:|---:|---|---|---|---:|---:|---:|\n")

def already_logged(date_str):
    if not os.path.exists(PROGRESS):
        return False
    with open(PROGRESS, "r", encoding="utf-8") as f:
        return f"| {date_str} |" in f.read()

def git_stats(hours, subpath=""):
    since = f"{hours} hours"
    path_args = []
    if subpath:
        path_args = ["--", subpath]

    # Commits
    commits_cmd = ["git", "rev-list", "--count", "--all", "--since", since] + path_args
    try:
        commits = sh(commits_cmd)
    except subprocess.CalledProcessError:
        commits = "0"

    # Files changed (unique names)
    names_cmd = ["git", "log", "--since", since, "--pretty=format:", "--name-only"] + path_args
    try:
        names_raw = sh(names_cmd)
        files_changed = len(set(n for n in names_raw.splitlines() if n.strip()))
    except subprocess.CalledProcessError:
        files_changed = 0

    # Lines added/removed
    numstat_cmd = ["git", "log", "--since", since, "--pretty=tformat:", "--numstat"] + path_args
    adds = dels = 0
    try:
        for line in sh(numstat_cmd).splitlines():
            parts = line.split("\t")
            if len(parts) >= 2 and parts[0].isdigit() and parts[1].isdigit():
                adds += int(parts[0])
                dels += int(parts[1])
    except subprocess.CalledProcessError:
        pass

    return str(commits or "0"), files_changed, f"+{adds}/-{dels}"

def append_row(date_str, commits, files_changed, delta_str):
    row = f"| {date_str} | {commits} | {files_changed} | {delta_str} | — | — | — | — | — | — |\n"
    with open(PROGRESS, "a", encoding="utf-8") as f:
        f.write(row)

def main():
    date_str = berlin_today()
    ensure_header()
    if already_logged(date_str):
        # Already has today's row → exit quietly (idempotent)
        sys.exit(0)

    commits, files_changed, delta_str = git_stats(SINCE_HOURS, FILTER_PATH)
    append_row(date_str, commits, files_changed, delta_str)

if __name__ == "__main__":
    main()
