
import rospy
import commandcenter as cc


is_shutdown = False
host = "wallar.me"
port = 8080
name = "pinesbot"
node_name = "turtlebot_html5"


if __name__ == "__main__":
    rospy.init_node(node_name, anonymous=False)
    ctr = cc.CommandCenter(host, port)
    rospy.on_shutdown(cc.shutdown)
    ctr.run(name)
