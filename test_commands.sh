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



#############################
# Activities
#############################

# A. Get All User Activities
curl -X GET "https://vigilant-spork-69qv4g6j54vxf5rx5-8000.app.github.dev/activities"


# B. Create / Save User Activity
curl -X POST "https://vigilant-spork-69qv4g6j54vxf5rx5-8000.app.github.dev/activities" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "steps": 7500,
    "water_intake": 2.5,
    "calories_burned": 420
  }'


# C. Update User Activity
curl -X PUT "https://vigilant-spork-69qv4g6j54vxf5rx5-8000.app.github.dev/activities/1" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "steps": 9000,
    "water_intake": 3.0,
    "calories_burned": 500
  }'


# D. Delete User Activity
curl -X DELETE "https://vigilant-spork-69qv4g6j54vxf5rx5-8000.app.github.dev/activities/1"


# Medical
##################### API Observation Via Codespace URL
##################### API Observation Via Hoppscotch
##################### API Observation Via CURL

# A. Get All Medical Records
curl -X GET "https://vigilant-spork-69qv4g6j54vxf5rx5-8000.app.github.dev/medical"


# B. Create Medical Record
curl -X POST "https://vigilant-spork-69qv4g6j54vxf5rx5-8000.app.github.dev/medical" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "disease": "Diabetes",
    "genetic_disease": "Yes",
    "allergies":"no",
    "notes": "Family history present"
  
  }'


# C. Update Medical Record
curl -X PUT "https://vigilant-spork-69qv4g6j54vxf5rx5-8000.app.github.dev/medical/1" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "disease": "Diabetes",
    "genetic_disease": "No",
    "allergies":"no",
    "notes": "Family history present"
  }'


# D. Delete Medical Record
curl -X DELETE "https://vigilant-spork-69qv4g6j54vxf5rx5-8000.app.github.dev/medical/1"

