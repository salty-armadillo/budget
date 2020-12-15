import json
from flask import Blueprint, request
from datetime import datetime
from src.services.transactions import get_transactions, add_transaction

TRANSACTIONS = Blueprint('transactions', __name__)

@TRANSACTIONS.route('/transactions', methods=['GET'])
def get_transactions():
    '''Get list of transactions - ordered by create time'''
    payload = request.get_json()
    offset = payload["offset"]
    length = payload["length"]
    transactions = get_transactions(offset, length)
    return json.dumps(transactions)

@TRANSACTIONS.route('/transactions/add', methods=['POST'])
def add_transaction(value, description):
    '''Add transaction'''
    payload = request.get_json()
    value = float(payload["value"])
    description = payload["description"]
    add_transaction(datetime.now(), value, description)
    return json.dumps({})