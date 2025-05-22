# data = response.json()
import requests

# Send a GET request to a URL (you can replace this with your actual URL)
response = requests.get("https://jsonplaceholder.typicode.com/posts/1")

# Parse the JSON data
data = response.json()

# Print the result
print(data)
