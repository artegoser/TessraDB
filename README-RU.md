
|[RU](README-RU.md)|[EN](README.md)|
|--|--|

![Travis (.com)](https://img.shields.io/travis/com/artegoser/TessraDB?style=flat-square)
![Coveralls](https://img.shields.io/coveralls/github/artegoser/TessraDB?style=flat-square)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fartegoser%2FTessraDB.svg?type=small)](https://app.fossa.com/projects/git%2Bgithub.com%2Fartegoser%2FTessraDB?ref=badge_small)

# TessraDB
 TessraDB это локальная noSQL база данных


### TODO 1.X
- [x] Создание БД
- [x] Создание коллекции (createCollection)
- [x] Получение всех коллекций (db.collections)
- [x] Получение коллекции по имени (db.getCollection())
- [x] Атомарная запись в файл
- [x] Потоковое чтение и запись коллекции 
- [x] Вставка документов в коллекцию (insert, insertMany)
- [ ] Удаление документов из коллекции (delete, deleteMany)
- [ ] Поиск документов в коллекции (функции find, findOne like in mongodb, но без атомрных операций (пока что)
- [ ] Замена документа по значению (replace, replaceOne)
- [ ] Обновление документа по значению (update, updateOne)