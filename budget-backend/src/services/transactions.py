from mysql import connector
import configparser

def fetch_transactions(offset, length):
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
        f"SELECT * FROM transactions ORDER BY create_time DESC LIMIT {offset}, {length};"
    )

    results = [list(i) for i in dbCursor.fetchall()]

    dbCursor.close()
    db.close()

    return results

def insert_transaction(create_time, amount, description, category):
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
        f"INSERT INTO transactions (create_time, amount, description, category) VALUES ('{create_time}', {amount}, '{description}', '{category}');"
    )

    db.commit()
    dbCursor.close()
    db.close()

    return