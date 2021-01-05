import sys
import configparser
from flask import Flask
from flask_cors import CORS
from json import dumps
from mysql import connector
from routes.transactions import TRANSACTIONS
from routes.budgetGoals import BUDGET_GOALS

def default_handler(err):
    '''Default handler'''
    print(err)
    response = err.get_response()
    print('response', err, err.get_response())
    response.data = dumps({
        "code": err.code,
        "name": "System Error",
        "message": err.get_description(),
    })
    response.content_type = 'application/json'
    return response

APP = Flask(__name__)
CORS(APP)

APP.config['TRAP_HTTP_EXCEPTIONS'] = True
APP.register_error_handler(Exception, default_handler)
APP.register_blueprint(TRANSACTIONS, url_prefix='/transactions')
APP.register_blueprint(BUDGET_GOALS, url_prefix='/budgetgoals')

config = configparser.ConfigParser()
config.read('config.ini')

db = connector.connect(
    host="localhost",
    user=config["database"]["username"],
    password=config["database"]["password"]
)
dbCursor = db.cursor()

try:
    dbCursor.execute("USE budgeting_db;")
except connector.Error as err:
    if err.errno == connector.errorcode.ER_ACCESS_DENIED_ERROR:
        print("Access denied.")
    elif err.errno == connector.errorcode.ER_BAD_DB_ERROR:
        dbCursor.execute("CREATE DATABASE budgeting_db;")
        dbCursor.execute("USE budgeting_db;")
    else:
        print(err)

with open('database/createDB.sql', 'r') as f:
    with dbCursor:
        dbCursor.execute(f.read(), multi=True)

dbCursor.close()

if __name__ == "__main__":
    APP.run(port=(int(sys.argv[1]) if len(sys.argv) == 2 else 8080), debug=True)