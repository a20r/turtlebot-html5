
from flask import Flask

app = Flask(__name__)
app.config.from_object(__name__)

velocity_store = dict()
controller_queue = dict()
