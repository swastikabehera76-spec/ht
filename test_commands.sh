
# A. Get User Details
curl -X GET "https://vigilant-spork-69qv4g6j54vxf5rx5-8000.app.github.dev/api/users"

# B. Create/Save User Details
curl -X POST "https://vigilant-spork-69qv4g6j54vxf5rx5-8000.app.github.dev/api/users" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "name": "swastika",
    "age": 20,
    "height": 152,
    "weight": 60,
    "gender": "Female"
  }'

# # C. Update User Details

curl -X PUT "https://vigilant-spork-69qv4g6j54vxf5rx5-8000.app.github.dev/api/users/1" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "name": "swastika",
    "age": 20,
    "height": 140,
    "weight": 58,
    "gender": "Female"
  }'


# # D. Delete User Details
curl -X DELETE "https://vigilant-spork-69qv4g6j54vxf5rx5-8000.app.github.dev/api/users/1"



# A. Get All User Activities
curl -X GET "https://vigilant-spork-69qv4g6j54vxf5rx5-8000.app.github.dev/api/activity"


# # B. Create / Save User Activity
curl -X POST "https://vigilant-spork-69qv4g6j54vxf5rx5-8000.app.github.dev/api/activity" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "steps": 7500,
    "water_intake": 2.5,
    "calories_burned": 420
  }'


# # C. Update User Activity
curl -X PUT "https://vigilant-spork-69qv4g6j54vxf5rx5-8000.app.github.dev/api/activity/1" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "steps": 9000,
    "water_intake": 3.0,
    "calories_burned": 500
  }'


# # D. Delete User Activity
curl -X DELETE "https://vigilant-spork-69qv4g6j54vxf5rx5-8000.app.github.dev/api/activity/1"

# A. Get All Medical Records
curl -X GET "https://vigilant-spork-69qv4g6j54vxf5rx5-8000.app.github.dev/api/medical"


# B. Create Medical Record
curl -X POST "https://vigilant-spork-69qv4g6j54vxf5rx5-8000.app.github.dev/api/medical" \
  -H "Content-Type: application/json" \
  -d '{
    "id": 8,
    "user_id": 7,
    "disease": "Flu",
    "genetic_disease": "No",
    "allergies": "None"
  }'
# C. Update Medical Record
curl -X PUT "https://vigilant-spork-69qv4g6j54vxf5rx5-8000.app.github.dev/medical/2" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "disease": "Diabetes",
    "genetic_disease": "nope",
    "allergies": "None",
  }'


# D. Delete Medical Record
curl -X DELETE "https://vigilant-spork-69qv4g6j54vxf5rx5-8000.app.github.dev/medical/2"


