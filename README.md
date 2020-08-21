# DoShort - исходники

### Установка NodeJS
> Для начала нужно установить [NodeJS]:https://nodejs.org/dist/v12.18.3/node-v12.18.3-x64.msi
> Для Linux: 
```bash
sudo apt update && sudo apt install nodejs npm
```

### Установка компонентов

>Устанавливаем зависимости
>>Для папки server:
```bash
cd server
npm i
```
>>Для папки client (5-20 мин):
```bash
cd ..
cd client
npm i
```

### Запуск 

> Запускаем client (браузер откроется сам):
```bash
npm start
```
>Запускаем server:
```bash
cd ..
cd server
npm start
```

### Настройка

> MongoDB:
Заходим на сайт [MongoDB]:https://www.mongodb.com/cloud/atlas/signup и регестрируемся:
![MongoDB](https://i.imgur.com/y1aqYrW.png "MongoDB")

Если появилось такое окно, нажимаем skip:
![Skip](https://i.imgur.com/DyJ9UML.png "Skip On MongoDB")

Далее, на следущей странице выбираем Shared cluster, нажимаем Create cluster:
![Free cluster](https://i.imgur.com/v74JT6R.png "Free Cluster Mongo DB")
Нас перекинет сюда:
![Next page](https://i.imgur.com/IpfbNel.png)
Нажимаем Create cluster и ждем:
![Waiting](https://i.imgur.com/6Sxciki.png)

---

