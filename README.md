# DoShort - исходники

### Установка NodeJS
> Для начала нужно установить [NodeJS](https://nodejs.org/dist/v12.18.3/node-v12.18.3-x64.msi)
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

> MongoDB в папке Server:

Заходим на сайт [MongoDB](https://www.mongodb.com/cloud/atlas/signup) и регестрируемся:

![MongoDB](https://i.imgur.com/y1aqYrW.png "MongoDB")

Если появилось такое окно, нажимаем skip:

![Skip](https://i.imgur.com/DyJ9UML.png "Skip On MongoDB")

Далее, на следущей странице выбираем Shared cluster, нажимаем Create cluster:

![Free cluster](https://i.imgur.com/v74JT6R.png "Free Cluster Mongo DB")

Нас перекинет сюда:

![Next page](https://i.imgur.com/IpfbNel.png)

Нажимаем Create cluster и ждем:

![Waiting](https://i.imgur.com/6Sxciki.png)

После того, как cluster начнёт функцианировать нажимаем CONNECT:

![Connect button](https://i.imgur.com/0DcIjWo.png)

Далее нажимаем всё как на скриншоте:

![Screen](https://i.imgur.com/AN852nw.png)
![Screen2](https://i.imgur.com/xAqnsSj.png)
![Screen3](https://i.imgur.com/ySjUy2G.png)

Окей, теперь копируем эту строчку(см. изо. ниже), переходим в папку server, затем в папку config и открываем config.json. Вместо url вставляем нашу ссылку

![уже лень писать](https://i.imgur.com/Rmwkcra.png)

```Вместо <password> вставляем свой пароль, а вместо <dbname> любую строчку наприер, shrt```

# Всё, спасибо досвидания я пошел отыхать, текст писал 50 минут
