
import config
from flask import request, jsonify


velocity_store = dict()


@config.app.route("/vel/<name>", methods=["POST"])
def post_velocity(name):
    tilt_lr = request.form["tilt_lr"]
    tilt_fb = request.form["tilt_fb"]
    print tilt_lr, tilt_fb
    return jsonify(error=0, message="No bloody error")


@config.app.route("/vel/<name>", methods=["GET"])
def get_velocity(name):
    pass
