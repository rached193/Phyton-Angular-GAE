from google.appengine.ext import ndb
import string

class Serie(ndb.Model):
  title = ndb.StringProperty()
  poster = ndb.StringProperty()
  typel = ndb.StringProperty()
  plot = ndb.StringProperty()
  serieid  = ndb.IntegerProperty()


class User(ndb.Model):
  name = ndb.StringProperty()
  nickname = ndb.StringProperty()
  email = ndb.StringProperty()
  passw = ndb.StringProperty()


def AllSerie():
  return Serie.query()

def FetchSerie(keyid):
    qry = Serie.query(Serie.serieid == string.atoi(keyid))
    return qry.get()


def UpdateSerie(id, title, poster, typel, plot):
  serie = Serie(id=id, title=title, poster=poster, typel=typel, plot=plot)
  serie.put()
  return serie


def InsertSerie(serieid, title, poster, typel, plot):
  serie = Serie(serieid=serieid, title=title, poster=poster, typel=typel, plot=plot)
  serie.put()
  return serie


def DeleteSerie(id):
  key = ndb.Key(Serie, id)
  key.delete()

def InsertUser(name, nickname, email, passw):
    qry = User.query(User.name == name)
    if qry.get() is None:
        serie = User(name=name, nickname=nickname, email=email, passw=passw)
        serie.put()
        return 1
    else:
        return 0
