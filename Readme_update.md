### HOW TO LAUNCH SITE NOW

j'ai ajoute un Django bref en plus de Django tu dois install dans ton python certains module commande des dependances complets:

```shell
python install mongoengine pymongo django djangorestframework django-cors-headers
```

pour innstaller MongoDB community server sur Linux 
```Bash
    sudo apt install mongodb
    sudo systemctl start mongodb
```

maintenant meme pour lancer on va varier tu devras donc lancer 2 ports pour que le site se lance :

- **Django** 
 ```shell
    cd BackEnd
    python manage.py runserver
 ```
- **Vite** 
```shell
    cd FrontEnd
    npm run dev
``` 

