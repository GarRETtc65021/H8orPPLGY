import psutil

app = Flask(__name__)

def index():
    mem_metric = psutil.virtual_memory().percent
    if cpu_metric > 80 or mem_metric > 80:
        Message = "High CPU or Memory Detected, scale up!!!"

    app.run(debug=True, host = '0.0.0.0')