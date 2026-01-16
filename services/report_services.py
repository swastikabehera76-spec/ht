# services/report_service.py 
from database.queries.report_queries import user_health_report

def service_get_health_report():
    return user_health_report()