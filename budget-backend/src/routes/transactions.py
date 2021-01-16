import json
from flask import Blueprint, request
from utils import json_serial

from services.transactions import fetch_transactions, fetch_transactions_between, insert_transaction

TRANSACTIONS = Blueprint('transactions', __name__)

@TRANSACTIONS.route('/fetch', methods=['GET'])
def get_transactions():
    '''Get list of transactions - ordered by create time'''
    offset = request.args.get("offset")
    length = request.args.get("length")
    start = request.args.get("start", None)
    end = request.args.get("end", None)

    transactions_keys = ["date", "amount", "description", "category"]
    transactions_values = fetch_transactions_between(start, end) if (start != None and end != None) else fetch_transactions(offset, length)
    transactions = [dict(zip(transactions_keys, i)) for i in transactions_values]

    return json.dumps(transactions, default=json_serial)

@TRANSACTIONS.route('/add', methods=['POST'])
def add_transaction():
    '''Add transaction'''
    payload = request.get_json()
    date = payload["date"]
    amount = float(payload["amount"])
    description = payload["description"]
    category = payload["category"]
    insert_transaction(date, amount, description, category)
    return json.dumps({})