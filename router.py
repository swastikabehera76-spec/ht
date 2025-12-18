
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse

from controllers.students import (
    get_all_students,
    get_student,
    create_student,
    update_student,
    delete_student,
)
from core.middleware import add_cors_headers
from core.responses import send_404

class Router(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        self.send_response(200)
        add_cors_headers(self)
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)

        if parsed.path == '/students':
            get_all_students(self)
        elif parsed.path.startswith('/students/'):
            get_student(self)
        else:
            send_404(self)

    def do_POST(self):
        if self.path == '/students':
            create_student(self)
        else:
            send_404(self)

    def do_PUT(self):
        if self.path.startswith('/students/'):
            update_student(self)
        else:
            send_404(self)

    def do_DELETE(self):
        if self.path.startswith('/students/'):
            delete_student(self)
        else:
            send_404(self)