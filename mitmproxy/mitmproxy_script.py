from mitmproxy import http

def request(flow: http.HTTPFlow) -> None:
    if flow.request.scheme == "https":
        flow.request.scheme = "http"
        flow.request.port = 3000  # Express server HTTP port
        flow.request.host = "express_server"  # Docker service name
        flow.request.path = "/data"  # Or keep it as it is based on your use case
        print(f"Downgraded request to {flow.request.pretty_url}")  # This prints to the terminal!
    # Print the request payload (if it exists)
    if flow.request.content:
        try:
            # If it’s JSON, try to print it in a readable way
            print(f"Request Payload (JSON): {flow.request.json()}")
        except ValueError:
            # If it's not JSON, just print raw data
            print(f"Request Payload (Raw): {flow.request.content}")

def response(flow: http.HTTPFlow) -> None:
    print(f"Got response from {flow.request.host}: {flow.response.status_code}")  # This prints response status
