#!/usr/bin/env bash
# Run a fetch.py subcommand with live filtered tail + summary.
#
# Usage:
#   ./run.sh events
#   ./run.sh event cannes2026 [--delay 0.5]
#   ./run.sh project <slug> <uuid>
#
# Output goes to run.log (overwritten). The live tail only shows
# progress milestones, retries, failures, and the final summary.

set -u
cd "$(dirname "$0")"

LOG="run.log"
: > "$LOG"

python3 fetch.py "$@" >>"$LOG" 2>&1 &
PID=$!

echo "started PID=$PID — filtered tail follows (full log: $LOG)"
echo "-----"

# awk filter — uses 2-arg match() for macOS compatibility
tail -f -n 0 "$LOG" &
TAIL_PID=$!

cleanup() {
  kill $TAIL_PID 2>/dev/null || true
  kill $PID 2>/dev/null || true
}
trap cleanup EXIT INT TERM

# Stream stdout lines through an awk filter
wait $PID
EXIT=$?
sleep 1
kill $TAIL_PID 2>/dev/null || true

echo "-----"
echo "process exited ($EXIT). tail of $LOG:"
tail -15 "$LOG"
exit $EXIT
