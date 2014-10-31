
import config
from flask import request, jsonify


min_tilt = -30
max_tilt = 30


@config.app.route("/vel/<name>", methods=["POST"])
def post_velocity(name):
    abs_tilt_lr = request.form["tilt_lr"]
    abs_tilt_fb = request.form["tilt_fb"]
    zero_lr = request.form["zero_lr"]
    zero_fb = request.form["zero_fb"]

    tilt_lr = int(abs_tilt_lr) - int(zero_lr)
    tilt_fb = int(abs_tilt_fb) - int(zero_fb)

    if tilt_lr > max_tilt:
        tilt_lr = max_tilt

    if tilt_lr < min_tilt:
        tilt_lr = min_tilt

    if tilt_fb > max_tilt:
        tilt_fb = max_tilt

    if tilt_fb < min_tilt:
        tilt_fb = min_tilt

    vel_x = tilt_fb / max_tilt
    vel_y = tilt_lr / max_tilt

    config.velocity_store[name] = (vel_x, vel_y)

    return jsonify(error=0, message="No bloody error")


@config.app.route("/vel/<name>", methods=["GET"])
def get_velocity(name):
    if name in config.velocity_store.keys():
        vel = config.velocity_store[name]
        return jsonify(vel_x=vel[0], vel_y=vel[1])
    else:
        return jsonify(vel_x=0, vel_y=0)
