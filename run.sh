#!/bin/bash
# Exit immediately if a command exits with a non-zero status.
set -e

# The main command dispatcher.
COMMAND=$1

# Check if a command was provided.
if [ -z "$COMMAND" ]; then
  echo "Error: No command provided."
  echo "Usage: ./run.sh {test_backend|start_backend|start_frontend|start_dev}"
  exit 1
fi

case $COMMAND in
  # Runs the backend test suite.
  test_backend)
    echo "--- Running backend tests ---"
    # Navigate to the backend directory and execute npm test.
    # This single chain solves the 'working directory' problem.
    (cd bobby-vision/backend && npm test)
    echo "--- Backend tests finished ---"
    ;;

  # Starts the backend server in the foreground.
  start_backend)
    echo "--- Starting backend dev server ---"
    (cd bobby-vision/backend && npm start)
    ;;

  # Starts the frontend server in the foreground.
  start_frontend)
    echo "--- Starting frontend dev server ---"
    (cd bobby-vision/frontend && npm start)
    ;;

  # Starts both frontend and backend servers in the background for E2E testing.
  start_dev)
    echo "--- Starting full development environment (in background) ---"
    
    # The parentheses run these in a subshell, so 'cd' doesn't affect the other commands.
    # The '&' runs the process in the background.
    (cd bobby-vision/backend && npm start &)
    echo "Backend server started in background..."
    
    (cd bobby-vision/frontend && npm start &)
    echo "Frontend server started in background..."
    
    sleep 5 # Give servers a moment to spin up.
    
    echo "--- Both servers are running in the background ---"
    echo "NOTE: You may need to manually stop these processes later."
    ;;

  # Handle unknown commands.
  *)
    echo "Error: Unknown command '$COMMAND'"
    echo "Usage: ./run.sh {test_backend|start_backend|start_frontend|start_dev}"
    exit 1
    ;;
esac