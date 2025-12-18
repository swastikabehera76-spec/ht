from http.server import HTTPServer
from router import HealthRouter
from database.connection import init_database

def run_serer():
    init_database()
    server = HTTPServer(("", 8000), HealthRouter)
    print("🚀 Health Tracker API running at http://localhost:8000")
    server.serve_forever()

if __name__ == "__main__":
    run_serer()