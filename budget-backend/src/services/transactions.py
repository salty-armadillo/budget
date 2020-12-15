from mysql import connector
import configparser

def conn_transactions_table():
    config = configparser.ConfigParser()
    config.read('config.ini')

    db = connector.connect(
        host="localhost",
        user=config["database"]["username"],
        password=config["database"]["password"],
        database='budgeting_db'
    )

    dbCursor = db.cursor()

    return dbCursor

def get_transactions(offset, length):
    dbCursor = conn_transactions_table()

    dbCursor.execute(
        f"SELECT * FROM transactions ORDER BY create_time DESC OFFSET {offset} rows FETCH NEXT {length} ROWS ONLY;"
    )

    results = dbCursor.fetchall()

    return results

def add_transaction(create_time, value, description):
    dbCursor = conn_transactions_table()

    dbCursor.exectute(
        f"INSERT INTO transactions (create_time, value, description) VALUES ({create_time}, {value}, {description});"
    )

    dbCursor.commit()
    return