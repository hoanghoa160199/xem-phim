import pymongo
import uuid
myclient = pymongo.MongoClient("mongodb://localhost:27017/")["xem-phim"]
mycol = myclient["episodes"]

x = mycol.find_one_and_update({'id': '427ed3fa-13de-4a65-9731-d42695dbb6c5'},
                              {'$set': {"name": 'nameasdadadqw', 'link': 'asduy123qwd'}})
print(x)
