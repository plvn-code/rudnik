# Tiny local receiver: POST /save?name=<path> with raw body -> research/raw/<path>
import http.server, os, sys, urllib.parse
ROOT = os.path.abspath(sys.argv[1])
class H(http.server.BaseHTTPRequestHandler):
    def do_POST(self):
        q = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
        name = os.path.normpath(q['name'][0]).lstrip('/')
        if name.startswith('..'): self.send_response(400); self.end_headers(); return
        p = os.path.join(ROOT, name); os.makedirs(os.path.dirname(p), exist_ok=True)
        n = int(self.headers['Content-Length']); open(p, 'wb').write(self.rfile.read(n))
        self.send_response(200); self.send_header('Access-Control-Allow-Origin', '*'); self.end_headers(); self.wfile.write(b'ok')
    def log_message(self, *a): pass
http.server.HTTPServer(('127.0.0.1', 8799), H).serve_forever()
