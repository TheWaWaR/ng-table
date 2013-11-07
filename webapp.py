#!/usr/bin/env python
#coding: utf-8

import json
import time
import random
from datetime import datetime, timedelta
import data
from flask import Flask, request, render_template


app = Flask(__name__)
r = random.Random()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/thead.json')
def thead():
    
    ret = {
        'keys': ['0', '1', '2', '3'],
        'dict': {
            '0': 'String',
            '1': 'Datetime',
            '2': 'Number',
            '3': 'Boolean'
        }
    }
    return json.dumps(ret)


def gen_records(page, count):
    now = datetime.now()
    def gen_dt():
        return (now - timedelta(seconds=r.randint(-100, 100))).strftime('%Y-%m-%d %H:%M:%S')
        
    _records = [['%d~col-1-%d'%(page, i), # String
                gen_dt(),                # Datetime(str)
                r.randint(0, 9),         # Number
                True if r.randint(0,1) else False # Boolean
            ]  for i in range(count)]
    return _records
    

@app.route('/tbody.json')
@app.route('/table.json')
def tbody():
    page = request.args.get('page', 1, type=int)
    perpage = request.args.get('perpage', 20)
    order = request.args.get('order', '')
    orderDirection = request.args.get('orderDirection', '')

    time.sleep(1)
    print 'page, perpage:', page, perpage

    # 1. Filter
    _records = data.records
    _string = request.args.get('string', '')
    _int = request.args.get('int', '')
    boolean = request.args.get('boolean', '')
    datetime_from = request.args.get('datetime-from', '')
    datetime_to = request.args.get('datetime-to', '')
    if _string:
        _records = filter(lambda x: True if x[0].lower().find(_string) > -1 else False, _records)
    if _int:
        _int = int(_int)
        _records = filter(lambda x: True if x[2] == _int else False, _records)
    if boolean:
        boolean = True if boolean == 'true' else False
        _records = filter(lambda x: True if x[3] == boolean else False, _records)
    if datetime_from:
        _records = filter(lambda x: True if x[1] >= datetime_from else False, _records)
    if datetime_to:
        _records = filter(lambda x: True if x[1] <= datetime_to else False, _records)

    # 2. Pagination
    count = len(_records)
    pages = (count+perpage-1) / perpage
    if page > pages or page < 1:
        return json.dumps({'status': 'error', 'message': 'Page number invalid:  %d ' % page})
        
    if order:
        def cmp_up(idx):
            return lambda x, y: 1 if x[idx] > y[idx] else -1
        def cmp_down(idx):
            return lambda x, y: 1 if x[idx] < y[idx] else -1
        cmp_func = cmp_down if orderDirection == '-' else cmp_up
        idx = int(order)
        _records.sort(cmp=cmp_func(idx))
        
    start, end = (page-1) * perpage, page*perpage
    rows = _records[start:end]
    
    ret = {
        'status' : 'success',
        'rows'   : rows,
        'count'  : count,
        'page'   : page,
        'pages'  : pages,
        'heads'  : [ '0', '1', '2', '3' ],
        'headDict' : { '0':'String', '1':'Datetime', '2':'Number', '3': 'Boolean'}
    }
    return json.dumps(ret)

    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000, debug=True)
