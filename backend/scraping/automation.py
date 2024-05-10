from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time
import json

options = Options()
options.add_argument('--headless')
title_count = 79480

driver = webdriver.Chrome(options=options)
driver.get('https://myvideogamelist.com/platforms')

games = dict()

for i in range(1, title_count):
    try:
        driver.get(f"https://myvideogamelist.com/game/{i}")

        content_elements = driver.find_elements(By.ID, 'kt_content_container')

        title = content_elements[0].find_element(By.TAG_NAME, 'h3').text
        if title in games:
            info = driver.find_elements(By.CLASS_NAME, 'row.mt-5')

            elements = []
            for element in info:
                elements.append(element.text)
            
            for element in elements:
                items = element.split('\n')
                for i in range(len(items) - 1):
                    games[title][items[i]] = items[i + 1]
        else:
            games[title] = dict()

            games[title]['description'] = content_elements[0].find_element(By.TAG_NAME, 'p').text
            
            info = driver.find_elements(By.CLASS_NAME, 'row.mt-5')

            elements = []
            for element in info:
                elements.append(element.text)
            
            for element in elements:
                items = element.split('\n')
                for i in range(0, len(items), 2):
                    if i + 1 < len(items):
                        games[title][items[i]] = items[i + 1]

            with open('titles/games.json', 'w') as f:
                json.dump(games, f, indent=4)
            
            image = driver.find_element(By.CLASS_NAME, 'img-fluid.img-thumbnail').get_attribute('src')
            driver.get(image)

            safe_title = title.replace(' ', '_').replace(':', '').replace('?', '').replace('!', '').replace('/', '').replace('\\', '').replace('*', '').replace('<', '').replace('>', '').replace('|', '')
            with open(f'titles/images/{safe_title}.png', 'wb') as f:
                f.write(driver.find_element(By.TAG_NAME, 'img').screenshot_as_png)
            
            print(f'{title} has been scraped')
    except Exception as e:
        print(f"An error occurred: {e}")
        continue

driver.quit()