from google.appengine.ext import ndb
import string

class Serie(ndb.Model):
  title = ndb.StringProperty()
  poster = ndb.StringProperty()
  typel = ndb.StringProperty()
  plot = ndb.StringProperty()
  serieid  = ndb.IntegerProperty()


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
