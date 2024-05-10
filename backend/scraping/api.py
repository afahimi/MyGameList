import requests
import json
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv('API_KEY')

def get_data():
    response = requests.get(f'https://api.rawg.io/api/games?key={api_key}')
    return response.json()

resp = get_data()
print(resp)

# save to a json file
with open('games.json', 'w') as f:
    json.dump(resp, f)