# database/queries/queries_report.py

from database.connection import get_connection

def user_health_report():
    """
    Fetch combined health data using LEFT JOIN
    Returns one row per user with aggregated activity/medical data
    """
    try:
        conn = get_connection()
        cursor = conn.cursor()

        query = """
            SELECT 
                u.id AS user_id,
                u.name,
                u.age,
                u.height,
                u.weight,
                u.gender,
                COALESCE(a.steps, 0) AS steps,
                COALESCE(a.water_intake, 0) AS water_intake,
                COALESCE(a.calories_burned, 0) AS calories_burned,
                COALESCE(m.disease, 'None') AS disease,
                COALESCE(m.genetic_disease, 'None') AS genetic_disease,
                COALESCE(m.allergies, 'None') AS allergies
            FROM user_inputs u
            LEFT JOIN user_activity a ON a.user_id = u.id
            LEFT JOIN medical_info m ON m.user_id = u.id
            ORDER BY u.id DESC
        """

        cursor.execute(query)
        rows = cursor.fetchall()

        result = [
            {
                "user_id": row[0],
                "name": row[1],
                "age": row[2],
                "height": row[3],
                "weight": row[4],
                "gender": row[5],
                "steps": row[6],
                "water_intake": row[7],
                "calories_burned": row[8],
                "disease": row[9],
                "genetic_disease": row[10],
                "allergies": row[11]
            }
            for row in rows
        ]

        conn.close()
        print(f"✅ Report query successful: {len(result)} records found")
        return result

    except Exception as e:
        print(f"❌ Database error in user_health_report: {e}")
        import traceback
        traceback.print_exc()
        return []
