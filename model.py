from google.appengine.ext import ndb
import string

#Modelo de las series
class Serie(ndb.Model):
    title = ndb.StringProperty()
    poster = ndb.StringProperty()
    typel = ndb.StringProperty()
    plot = ndb.StringProperty()
    serieid  = ndb.IntegerProperty()
    episodes  = ndb.IntegerProperty()
    air = ndb.StringProperty()
    status = ndb.StringProperty()
    genres = ndb.StringProperty()

class Listado(ndb.Model):
    serieid  = ndb.IntegerProperty()
    seriname  = ndb.StringProperty()
    score = ndb.IntegerProperty()
    typel = ndb.StringProperty()
    progress = ndb.IntegerProperty()


#Modelo de los usuarios
class User(ndb.Model):
    name = ndb.StringProperty()
    nickname = ndb.StringProperty()
    email = ndb.StringProperty()
    passw = ndb.StringProperty()
    list = Listado()



def AllSerie():
    return Serie.query()

#Busca una serie por id, devuelve None si no existe
def FetchSerie(id):
    #qry = Serie.query(Serie.serieid == string.atoi(keyid))
    keyserie = ndb.Key(Serie, int(id))
    serie = keyserie.get()
    return serie


def UpdateSerie(title, poster, typel, plot,episodes,genres,air,status):
    serie = Serie(title=title, poster=poster, typel=typel, plot=plot,episodes=episodes,genres=genres,air=air,status=status)
    serie.put()
    return serie

#Inserta una serie nueva en la base de datos
def InsertSerie(title, poster, typel, plot,episodes,genres,air,status):
    serie = Serie(poster=poster, typel=typel, plot=plot,episodes=episodes,genres=genres,air=air,status=status)
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

#Verifica si el usuario y su pass son correctos
def CheckUser(name, passw):
    qry = User.query(User.name == name)
    usuario = qry.get()
    if usuario is None:
        return None
    else:
        if usuario.passw==passw:
            return usuario.nickname
        else:
            return None
