"""
This file gathers the character data hosted on DnDbeyond and stores it in the appropiate
directory within the src directory. 

Ideally, the character data should be obtained client side. However, this does not seem
to be possible, due to the CORS policy from DnDbeyond. Therefore, this script runs each
time on deployment.
"""

import os
import requests

def process_ID(ID):
    """ Requests and save data from the DnDbeyond endpoint. """

    print(f"Processing character ID={ID}")

    url = f"https://character-service.dndbeyond.com/character/v5/character/{ID}"
    response = requests.get(url)

    if not response.ok:
        raise Exception(f"Could not obtain data for {ID}")

    save_path = f"src/assets/characters/{ID}.json"
    with open(save_path, "w") as f:
        f.write(response.text)


def main():

    character_IDs = [
        49093889, 87953644, 53799196 # Test characters
    ]

    for ID in character_IDs:
        process_ID(ID)

if __name__ == "__main__":
    main()
