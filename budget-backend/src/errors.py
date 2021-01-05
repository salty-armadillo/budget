from werkzeug.exceptions import HTTPException

class InputError(HTTPException):
    code = 400
    message = 'Bad request'