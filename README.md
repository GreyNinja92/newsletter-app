# Setting up frontend

```
cd frontend
npm install
yarn start
```

# Setting up backend

```
cd backend
pip install pipenv
pipenv install
pipenv shell
cd newsletter
python manage.py runserver
```

Backend exposes an API which allows us to add/delete/list users.

### Add Users

```
curl -H "Content-Type: application/json" -X POST --data '{"email":"greyninja@gmail.com"}' 127.0.0.1:8000/api/users/
```

### Delete User

```
curl -X DELETE 127.0.0.1:8000/api/users/1/
```

### List Users

```
curl 127.0.0.1:8000/api/users/
```




