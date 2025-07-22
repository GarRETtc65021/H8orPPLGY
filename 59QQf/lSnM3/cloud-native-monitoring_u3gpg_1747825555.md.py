import psutil

app = Flask(__name__)
def index():
    if cpu_metric > 80 or mem_metric > 80:
