import json
import webapp2
import time

import model

def AsDict(serie):
  return {'id': serie.serieid, 'Title': serie.title, 'Poster': serie.poster, 'Typel':serie.typel, 'Plot':serie.plot}



class RestHandler(webapp2.RequestHandler):

  def dispatch(self):
    #time.sleep(1)
    super(RestHandler, self).dispatch()


  def SendJson(self, r):
    self.response.headers['content-type'] = 'text/plain'
    self.response.write(json.dumps(r))


class QueryHandler(RestHandler):

  def get(self):
    series = model.AllSerie()
    r = [ AsDict(serie) for serie in series ]
    self.SendJson(r)


class InsertHandler(RestHandler):

  def post(self):
    r = json.loads(self.request.body)
    serie = model.InsertSerie(r['id'],r['title'], r['poster'],r['typel'],r['plot'])
    r = AsDict(serie)
    self.SendJson(r)


class FetchHandler(RestHandler):

  def post(self):
    r = json.loads(self.request.body)
    seriecode = r['keyserie']
    serie = model.FetchSerie(seriecode);
    r = AsDict(serie)
    self.SendJson(r)



APP = webapp2.WSGIApplication([    #Router del Back-End
    ('/rest/query', QueryHandler),
    ('/rest/insert', InsertHandler),
    ('/rest/fetch', FetchHandler),

], debug=True)
