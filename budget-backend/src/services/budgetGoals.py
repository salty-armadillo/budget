from mysql import connector
import configparser

def fetch_budget_goals(timeframe, start, end):
    config = configparser.ConfigParser()
    config.read('config.ini')

    db = connector.connect(
        host="localhost",
        user=config["database"]["username"],
        password=config["database"]["password"],
        database='budgeting_db'
    )

    dbCursor = db.cursor()

    dbCursor.execute(
        f"SELECT * FROM budget_goals WHERE timeframe = '{timeframe}' AND create_time BETWEEN '{start}' AND '{end}' ORDER BY create_time DESC;"
    )

    results = [list(i) for i in dbCursor.fetchall()]

    dbCursor.close()
    db.close()

    return results

def add_budget_goals(create_time, goals, timeframe):
    config = configparser.ConfigParser()
    config.read('config.ini')

    db = connector.connect(
        host="localhost",
        user=config["database"]["username"],
        password=config["database"]["password"],
        database='budgeting_db'
    )

    dbCursor = db.cursor()

    dbCursor.execute(
        f"INSERT INTO budget_goals (create_time, goals, timeframe) VALUES ('{create_time}', '{goals}', '{timeframe}');"
    )

    db.commit()
    dbCursor.close()
    db.close()

    return