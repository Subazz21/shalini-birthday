import json
import os
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse
from pathlib import Path
import urllib.request
import urllib.error

PORT = int(os.environ.get('PORT', '3000'))
BOT_TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN', '8656358643:AAFqHvBXBw_XemKpQwF1iiw2cnBoHxafiik')
CHAT_ID = os.environ.get('TELEGRAM_CHAT_ID', '1488483740')
ROOT = Path(__file__).resolve().parent

MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.mp3': 'audio/mpeg',
    '.txt': 'text/plain; charset=utf-8',
    '.ico': 'image/x-icon'
}


def send_telegram_message(text: str):
    if not BOT_TOKEN or not CHAT_ID:
        raise RuntimeError('Bot token and chat ID are required.')

    payload = json.dumps({'chat_id': CHAT_ID, 'text': text, 'parse_mode': 'HTML'}).encode('utf-8')
    req = urllib.request.Request(
        f'https://api.telegram.org/bot{BOT_TOKEN}/sendMessage',
        data=payload,
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    with urllib.request.urlopen(req, timeout=10) as response:
        return json.loads(response.read().decode('utf-8'))


class Handler(BaseHTTPRequestHandler):
    def _send_json(self, status, payload):
        body = json.dumps(payload).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self._send_json(200, {'ok': True})

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path == '/api/telegram':
            length = int(self.headers.get('Content-Length', '0'))
            body = self.rfile.read(length).decode('utf-8')
            try:
                data = json.loads(body or '{}')
                message = str(data.get('message', '')).strip()
                if not message:
                    self._send_json(400, {'ok': False, 'error': 'A message is required.'})
                    return
                result = send_telegram_message(message)
                self._send_json(200, {'ok': True, 'result': result})
            except Exception as exc:
                self._send_json(500, {'ok': False, 'error': str(exc)})
            return

        self._send_json(404, {'ok': False, 'error': 'Not found'})

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == '/':
            path = ROOT / 'index.html'
        else:
            path = (ROOT / parsed.path.lstrip('/')).resolve()

        if not str(path).startswith(str(ROOT)):
            self._send_json(403, {'ok': False, 'error': 'Forbidden path'})
            return

        if not path.exists():
            self._send_json(404, {'ok': False, 'error': 'Not found'})
            return

        content_type = MIME_TYPES.get(path.suffix.lower(), 'application/octet-stream')
        data = path.read_bytes()
        self.send_response(200)
        self.send_header('Content-Type', content_type)
        self.send_header('Content-Length', str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def log_message(self, format, *args):
        return


if __name__ == '__main__':
    httpd = HTTPServer(('0.0.0.0', PORT), Handler)
    print(f'Birthday site server running at http://localhost:{PORT}')
    print('Telegram notifications are enabled with the configured bot token and chat ID.')
    httpd.serve_forever()
