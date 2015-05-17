
import rospy
import urllib2
from geometry_msgs.msg import Twist
import json


is_shutdown = False
host = "wallar.me"
port = 8080
name = "pinesbot"
node_name = "turtlebot_html5"


class CommandCenter(object):

    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.addr = "http://{}:{}".format(host, port)
        self.is_shutdown = False

    def shutdown(self):
        self.is_shutdown = True

    def get_velocity(self, name):
        url = self.addr + "/vel/" + name
        req = urllib2.urlopen(url)
        vel = json.loads(req.read())
        return vel

    def run(self, name):
        cmd_vel = rospy.Publisher('mobile_base/commands/velocity', Twist)
        r = rospy.Rate(10)

        while True:
            if self.is_shutdown:
                cmd_vel.publish(Twist())
                break

            move_cmd = Twist()
            vel = self.get_velocity(name)
            move_cmd.linear.x = 0.7 * vel["x"]
            move_cmd.angular.z = 1.5 * vel["y"]
            cmd_vel.publish(move_cmd)
            r.sleep()


if __name__ == "__main__":
    rospy.init_node(node_name, anonymous=False)
    ctr = CommandCenter(host, port)
    rospy.on_shutdown(ctr.shutdown)
    ctr.run(name)
