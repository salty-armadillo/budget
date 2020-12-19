import json
from flask import Blueprint, request
from datetime import datetime
from services.transactions import fetch_transactions, insert_transaction

TRANSACTIONS = Blueprint('transactions', __name__)

@TRANSACTIONS.route('/fetch', methods=['GET'])
def get_transactions():
    '''Get list of transactions - ordered by create time'''
    offset = request.args.get("offset")
    length = request.args.get("length")
    transactions = fetch_transactions(offset, length)
    return json.dumps(transactions)

@TRANSACTIONS.route('/add', methods=['POST'])
def add_transaction():
    '''Add transaction'''
    payload = request.get_json()
    value = float(payload["value"])
    description = payload["description"]
    insert_transaction(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), value, description)
    return json.dumps({})