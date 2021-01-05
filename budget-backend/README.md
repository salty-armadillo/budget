# Budget - backend
Backend Flask server for the main Budget application. Helping the user to track their spending history and record goals.

<br/>

## Version history
| Version | Date | Description |
|---------|------|-------------|
|   v1.0  | December 2020 | MVP - transaction recording and viewing |
|   v1.1  | January 2021 | Goal adding and retrieving |

<br/>

## Current features
* Adding a new transaction to the database
* Fetching a list of past transactions
    * Includes pagination - offset and length
* Adding a new set of goals to the database
    * Able to set different goals for different timeframes - e.g. weekly, monthly, overall etc.
* Fetching a list of past and current goals for a given timeframe

<br/>

## Technical specifications
* Python
* Flask
* MySQL

<br/>

## Installation/User guide
```
flask run
```