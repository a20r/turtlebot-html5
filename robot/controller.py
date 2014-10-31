
import urllib2
import rospy
from geometry_msgs.msg import Twist
import json


is_shutdown = False


class CommandCenter(object):

    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.addr = "http://{}:{}".format(host, port)

    def get_velocity(self, name):
        url = self.addr + "/vel/" + name
        req = urllib2.urlopen(url)
        vel = json.loads(req.read())
        return vel


def shutdown():
    global is_shutdown
    is_shutdown = True


def controller(cc, name):
    cmd_vel = rospy.Publisher('mobile_base/commands/velocity', Twist)
    r = rospy.Rate(10)

    while True:
        if is_shutdown:
            cmd_vel.publish(Twist())
            break

        move_cmd = Twist()
        vel = cc.get_velocity(name)
        move_cmd.linear.x = vel["x"]
        move_cmd.angular.z = vel["y"]
        cmd_vel.publish(move_cmd)
        r.sleep()


if __name__ == "__main__":
    rospy.init("turtlebot_html5", anonymous=False)
    host = "82.196.12.41"
    port = 80
    name = "test"
    cc = CommandCenter(host, port)
    controller(cc, name)
