## To contribute

```
Go to this link and fork the repository
This repo will be available in your account from which you have forked
Copy the repo link in your account's repositories
Clone it
Now try to make some changes or improvements that you want to work on in the codebase locally
commit and push the changes to you account
```

## Rasing a PR ( pull request )

```
After pushing the changes to your git account
go the repo in your repositories
and click on contribute button
click on create pull request
and you will be creating the pr
I will review and accept the pr
```

### CROPTO

#### Large screens

![pc_view_cropto](https://github.com/leocodeio/Cropto/blob/test/public/pc_view.png?raw=true "Optional title")

#### Large screens

![mobile_view_cropto](https://github.com/leocodeio/Cropto/blob/test/public/mobiile_view.png?raw=true "Optional title")

-- commands to run

## how to run the app

```
npm install -g pnpm
pnpm i
set up environments
pnpm run dev
```

### how to run api

```
cd api
poetry shell
poetry install
uvicorn fast_api:app --reload

sample input for /predict endpoint :

{
"rainfall": 10,
"crop": "wheat",
"soil_type": "black",
"season": "rainy",
"pesticide": "Mancozeb"
}

```
