
#!/bin/sh

PORT="${PORT:-3000}"

concurrently "BROWSER=none yarn start" "wait-on http://localhost:${PORT} && electron ."