
from flask import Flask

app = Flask(__name__)
app.config.from_object(__name__)

velocity_store = dict()
say_store = dict()
