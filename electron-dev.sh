
#!/bin/sh

PORT="${PORT:-3000}"

concurrently "BROWSER=none npm start" "wait-on http://localhost:${PORT} && electron ."