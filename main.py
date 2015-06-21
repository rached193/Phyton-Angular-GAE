import json
import webapp2
import time

import model

def AsDict(serie):
  return {'id': serie.key.id(), 'Title': serie.title, 'Poster': serie.poster, 'Typel':serie.typel, 'Plot':serie.plot ,'episodes':serie.episodes, 'genres':serie.genres , 'air':serie.air,'status':serie.status}


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
    serie = model.InsertSerie(0,r['title'], r['poster'],r['typel'],r['plot'],r['episodes'],r['genres'],r['air'],r['status'])
    r = AsDict(serie)
    self.SendJson(r)


class FetchHandler(RestHandler):

  def post(self):
    r = json.loads(self.request.body)
    serie = model.FetchSerie(r['keyserie']);
    r = AsDict(serie)
    self.SendJson(r)


class SignUpHandler(RestHandler):

    def post(self):
      r = json.loads(self.request.body)
      checkres = model.InsertUser(r['name'],r['nickname'], r['email'],r['passw'])
      if checkres:
        self.response.write('Todo Correcto')
      else:
        self.response.set_status(500)


class LoginHandler(RestHandler):

    def post(self):
      r = json.loads(self.request.body)
      checkres = model.CheckUser(r['name'],r['passw'])
      if checkres is None:
          self.response.set_status(500)
      else:
          self.SendJson({'nickname': checkres})



APP = webapp2.WSGIApplication([    #Router del Back-End
    ('/rest/query', QueryHandler),
    ('/rest/insert', InsertHandler),
    ('/rest/fetch', FetchHandler),
    ('/rest/signup', SignUpHandler),
    ('/rest/login', LoginHandler),

], debug=True)
