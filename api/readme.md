## howw to run app

```
poetry shell
poetry install
uvicorn main:app --reload
```

## sample input for /predict endpoint

```
{
"rainfall": 10,
"crop": "wheat",
"soil_type": "black",
"season": "rainy",
"pesticide": "Mancozeb"
}
```
