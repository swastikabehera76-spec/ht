
from datetime import datetime
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse

# USER controllers
from controllers.users import (
    get_all_users,
    get_user,
    create_user,
    update_user,
    delete_user
)

# ACTIVITY controllers
from controllers.activity import (
    get_all_activities,
    get_activity,
    create_activity,
    update_activity,
    delete_activity
)

from core.middleware import add_cors_headers
from core.responses import send_404


class Router(BaseHTTPRequestHandler):

    # -------- OPTIONS (CORS) --------
    def do_OPTIONS(self):
        self.send_response(200)
        add_cors_headers(self)
        self.end_headers()

    # -------- GET --------
    def do_GET(self):
        parsed = urlparse(self.path)

        # ===== USERS =====
        if parsed.path == "/users":
            return get_all_users(self)

        elif parsed.path.startswith("/users/"):
            try:
                user_id = int(parsed.path.split("/")[-1])
                return get_user(self, user_id)
            except ValueError:
                return send_404(self)

        # ===== ACTIVITIES =====
        elif parsed.path == "/activities":
            return get_all_activities(self)

        elif parsed.path.startswith("/activities/"):
            try:
                activity_id = int(parsed.path.split("/")[-1])
                return get_activity(self, activity_id)
            except ValueError:
                return send_404(self)

        return send_404(self)

    # -------- POST --------
    def do_POST(self):
        # USERS
        if self.path == "/users":
            return create_user(self)

        # ACTIVITIES
        elif self.path == "/activities":
            return create_activity(self)

        return send_404(self)

    # -------- PUT --------
    def do_PUT(self):
        # USERS
        if self.path.startswith("/users/"):
            try:
                user_id = int(self.path.split("/")[-1])
                return update_user(self, user_id)
            except ValueError:
                return send_404(self)

        # ACTIVITIES
        elif self.path.startswith("/activities/"):
            try:
                activity_id = int(self.path.split("/")[-1])
                return update_activity(self, activity_id)
            except ValueError:
                return send_404(self)

        return send_404(self)

    # -------- DELETE --------
    def do_DELETE(self):
        # USERS
        if self.path.startswith("/users/"):
            return delete_user(self)

        # ACTIVITIES
        elif self.path.startswith("/activities/"):
            return delete_activity(self)

        return send_404(self)

    # -------- LOGGER --------
    def log_message(self, format, *args):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] [Server] {format % args}")
