
def run(host, port):
    """

    Runs the server.

    @param host The host for the server

    @param port The port for the server

    """

    import pageserver
    import config

    config.app.run(host=host, port=int(port), debug=True)
