#!/usr/bin/env python
#coding: utf-8

import json
import time
from flask import Flask, request, render_template


app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/thead.json')
def thead():
    ret = ['Head1', 'Head2', 'Head3']
    return json.dumps(ret)
    

@app.route('/tbody.json')
def tbody():
    page = request.args.get('page', 1, type=int)
    perpage = request.args.get('perpage', 20)

    time.sleep(1.2)
    print 'page, perpage:', page, perpage
    
    count = 345
    records = [['%d~col-1-%d'%(page, i), 'col-2-%d'%i, 'col-3-%d'%i]  for i in range(count)]
    pages = (count+perpage-1) / perpage
    page = 1 if page > pages or page < 1 else page
    start, end = (page-1) * perpage, page*perpage
    rows = records[start:end]
    
    ret = {
        'rows' : rows,
        'count': count,
        'page' : page,
        'pages': pages
    }
    return json.dumps(ret)



    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000, debug=True)
