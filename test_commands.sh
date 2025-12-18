##################### API Observation Via Codespace URL
##################### API Observation Via Hopscotch
##################### API Observation Via CURL

# A. Get All users
curl -X GET "https://vigilant-spork-69qv4g6j54vxf5rx5-8000.app.github.dev/users"
# B. Get One user

curl -X GET "http://localhost:8000/api/students/1"

# C. Create user
curl -X POST "https://vigilant-spork-69qv4g6j54vxf5rx5-8000.app.github.dev/users" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "age": 25,
    "gender":"female",
    "height": 170,
    "weight": 52
  }'

# D. Update user
curl -X PUT "https://vigilant-spork-69qv4g6j54vxf5rx5-8000.app.github.dev/users/1" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "age": 25,
    "gender":"female",
    "height": 180,
    "weight": 52
  }'

# # E. Delete user
curl -X DELETE "https://vigilant-spork-69qv4g6j54vxf5rx5-8000.app.github.dev/users/1"


# ##################### DB Observation Via SQLite Web
# - install https://github.com/coleifer/sqlite-web
# - pip install sqlite-web
# - sqlite_web students.db