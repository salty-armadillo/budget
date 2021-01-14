import json
from flask import Blueprint, request
from jsonschema import validate

from utils import json_serial
from errors import InputError
from services.budgetGoals import fetch_budget_goals, add_budget_goals

BUDGET_GOALS = Blueprint('budgetgoals', __name__)

@BUDGET_GOALS.route('/fetch', methods=['GET'])
def get_transactions():
    '''Get list of budget - ordered by create time'''
    timeframe = request.args.get("timeframe")
    start = request.args.get("start")
    end = request.args.get("end")

    goals_keys = ["date", "goals", "timeframe"]
    goals_values = fetch_budget_goals(timeframe, start, end)
    goals = [dict(zip(goals_keys, i)) for i in goals_values]

    return json.dumps(goals, default=json_serial)

@BUDGET_GOALS.route('/add', methods=['POST'])
def add_transaction():
    '''Add budget goal'''
    jsonSchema = {}

    payload = request.get_json()
    date = payload["date"]
    goals = json.dumps(payload["goals"])
    timeframe = payload["timeframe"]
    try:
        validate(instance=goals, schema=jsonSchema)
        add_budget_goals(date, goals, timeframe)
        return json.dumps({})
    except:
        print(goals)
        raise InputError("Invalid goals format")
