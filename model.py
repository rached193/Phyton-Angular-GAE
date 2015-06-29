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
    seriename  = ndb.StringProperty()
    score = ndb.IntegerProperty()
    typel = ndb.StringProperty()
    progress = ndb.IntegerProperty()


#Modelo de los usuarios
class User(ndb.Model):
    name = ndb.StringProperty()
    nickname = ndb.StringProperty()
    email = ndb.StringProperty()
    passw = ndb.StringProperty()
    listado = ndb.StructuredProperty(Listado, repeated=True)


#<---------METODOS PARA LAS SERIES-------------------->BEGIN
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
    serie = Serie(title=title, poster=poster, typel=typel, plot=plot,episodes=episodes,genres=genres,air=air,status=status)
    serie.put()
    return serie


def DeleteSerie(id):
    key = ndb.Key(Serie, id)
    key.delete()

#<---------METODOS PARA LAS SERIES-------------------->END
#<---------METODOS PARA LOS USUARIOS------------------>BEGIN
def InsertUser(name, nickname, email, passw):
    qry = User.query(User.name == name)
    if qry.get() is None:
        serie = User(name=name, nickname=nickname, email=email, passw=passw,listado=[])
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
            return usuario.name
        else:
            return None

#<---------METODOS PARA LOS USUARIOS------------------>END
#<---------METODOS PARA LAS LISTAS-------------------->BEGIN
def addtoList(name,serieid):
    qry = User.query(User.name == name)
    usuario = qry.get()
    if usuario is None:
        return None
    else:
        keyserie = ndb.Key(Serie, int(serieid))
        serie = keyserie.get()
        if serie is None:
            return None
        else:
            listadoAux = Listado(serieid=int(serieid), seriename=serie.title, score=5, typel=serie.typel, progress=0)
            usuario.listado.append(listadoAux)
            usuario.put()
            return usuario.listado

def queryList(username):
        qry = User.query(User.name == username)
        usuario = qry.get()
        if usuario is None:
            return None
        else:
            return usuario.listado
#<---------METODOS PARA LAS LISTAS-------------------->END
