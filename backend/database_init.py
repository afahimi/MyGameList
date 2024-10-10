import json
import psycopg2
from psycopg2 import sql

conn = psycopg2.connect(database='mygameslist', user='hg683f')
cursor = conn.cursor()
print('Connected to database')

with open('./games.json', 'r') as f:
    data = json.load(f)

def populate_platforms():
    platforms = {game['Platform'] for game in data.values() if 'Platform' in game}
    platforms.discard('')

    for platform in platforms:
        try:
            cursor.execute(f"INSERT INTO platform (name) VALUES ('{platform}')")
            conn.commit()
            print(f"Platform {platform} added")
        except Exception as e:
            print(f"An error occurred: {e}")
            conn.rollback()
            continue

def populate_games():
    fields = ["NA Release Date", "description", "Publishers(s)"]

    values = dict()

    for title, game in data.items():
        curr = fields.copy()
        if "description" in game:
            curr.remove("description")
            values["description"] = game["description"]
        if "NA Release Date" in game:
            curr.remove("NA Release Date")
            values["release_date"] = game["NA Release Date"]
        if "Publishers(s)" in game:
            curr.remove("Publishers(s)")
            values["publisher"] = game["Publishers(s)"]

        for key, val in game.items():
            if not fields:
                break
            if key in curr:
                values[key] = val
            elif val in curr:
                values[val] = key

        print("Inserting into db: ", title, values["release_date"], values["publisher"])
        try:
            insert_query = sql.SQL("INSERT INTO game (title, release_date, description, publisher, star_rating) VALUES ({}, {}, {}, {}, 0)")
            cursor.execute(insert_query.format(sql.Literal(title), sql.Literal(values['release_date']), sql.Literal(values['description']), sql.Literal(values['publisher'])))
            conn.commit()
            print(f"Game {title} added")
        except Exception as e:
            print(f"An error occurred: {e}")
            conn.rollback()
            continue

def print_all_games():
    try:
        select_query = "SELECT title, release_date, publisher FROM game"
        cursor.execute(select_query)
        games = cursor.fetchall()
        for game in games:
            print(game)
    except Exception as e:
        print(f"An error occurred: {e}")
            


if __name__ == '__main__':
    # populate_platforms()
    # populate_games()
    print_all_games()
    cursor.close()
    conn.close()
    print('Connection closed')