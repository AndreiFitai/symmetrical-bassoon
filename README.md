[Click here to check solution details](#solution)

# Coding challenge

Hi Andrei!

Thanks for taking your time to work on this coding challenge.

Ideally this test should take a day or two. But feel free to take as much time as you need. Quality is more important than speed. Latest delivery though is in one week starting now.

This coding challenge will show us some of your skills. And you get to know our work flow as well. The solution of the challenge is not too hard. So you can focus on technology and code. Show us what you got! 😉

## Todo

1. Clone this repo.
2. Create a new development branch.
3. Use as many commits as you can so we can see your progress.
4. After finishing your work, create a Pull Request to the master branch.
5. Be ready to answer question.

## Requirements

- The task must be developed in NodeJS.
- Write tests where applicable/necessary.
- All code as well as documentation or comments must be in english.
- Provide instructions on how to run the project.

## Business description

A Subtitles Translator is a service that translates subtitles, it takes one or several subtitle files as input and produces the subtitles in the same format containing the translations of each one of the contained sentences. The translation is performed by using historical data stored in a [Translation Management System (TMS)](https://en.wikipedia.org/wiki/Translation_management_system). One translation is performed by going through the following steps:

1. Parses the subtitles file and extract the translatable source.
2. Translates the source using historical data.
3. Pairs the result with the source.
4. Reconstructs the subtitles file.

Below you can find an example of how a subtitles file looks like:

```
1 [00:00:12.00 - 00:01:20.00] I am Arwen - I've come to help you.
2 [00:03:55.00 - 00:04:20.00] Come back to the light.
3 [00:04:59.00 - 00:05:30.00] Nooo, my precious!!.
```

Is basically conformed by the id of the line, the time range, and then the content to be translated.

The output for this input would be a file containing something as:

```
1 [00:00:12.00 - 00:01:20.00] Ich bin Arwen - Ich bin gekommen, um dir zu helfen.
2 [00:03:55.00 - 00:04:20.00] Komm zurück zum Licht.
3 [00:04:59.00 - 00:05:30.00] Nein, my Schatz!!.
```

The second part of the system is the aforementioned TMS, as its name states, is a system that stores past translations to be reused, the structure of this system is really simple, it contains two endpoints, one for translating and the other for introducing data.

In order to translate a query, it uses the following flow:

1. Search for strings that are **approximately** equal in the database — They might not be the same but close enough to be consider a translation.
2. It calculates the distance between the query and the closest string found. — A standard way of calculating strings distance is by using [Levenshtein distance algorithm](https://en.wikipedia.org/wiki/Levenshtein_distance).
3. If the distance is less than 5, is considered a translation, otherwise the same query is returned as result.

In order to import data, it uses the following structure:

```json
[
  {
    "source": "Hello World",
    "target": "Hallo Welt",
    "sourceLanguage": "en",
    "targetLanguage": "de"
  },
  {
    "source": "Hello guys",
    "target": "Hallo Leute",
    "sourceLanguage": "en",
    "targetLanguage": "de"
  },
  {
    "source": "I walk to the supermarket",
    "target": "Ich gehe zum Supermarkt.",
    "sourceLanguage": "en",
    "targetLanguage": "de"
  }
]
```

## Task

Your task is:

1. Create a REST API for uploading subtitles in a plain text format (.txt) and send an email with the translation as attachment once the process done.
2. Create the TMS either inside or outside the document translator (however you feel is the best way) with the two endpoints stated before.

Feel free to define yourself the API contracts and the project structure.

## Bonus point

- Creativity.
- Clean code.
- Usage of best practices.
- Usage of Typescript.
- Usage of Docker.

We wish you the best of lucks 🙏!

# Solution

[Intro](#intro)  
[How to use](#how-to-use)  
[Issues i had](#issues-i-had)  
[What i want to do next](#what-i-want-to-do-next)

## Intro

This was one of the most fun challenges I had to work with purely due to the fact that the requirements allow for either a simple solution or a more complex one with different approaches to consider.
Due to that i was really excited to implement something a bit more complex ( maybe overkill ) for this solution:

![Project overview](project-overview.png)

## How to use

Ensure you have Docker Engine v20.10+ , docker-compose v1.27+ and npm v6.14+

I couldn't get the project to work properly on WSL2 so please use MacOS or a Linux based OS.

### Setup

1. In the main project folder run `npm run setup` to install all required modules for all services and add permissions to the required files
2. Run `npm run test-all` in the main folder to run all existing tests
3. Run `npm run dev-up` to build the containers and start them up - in the "dev" mode you can modify services and containers will auto-restart with the new changes
4. Alternatively run `npm run prod-up` - this would build and run the containers in isolation and would simulate a production environment: containers not linked to project folders, no hot reload, different logging level.
5. For your convenience you can use `npm run dev-build` or `npm run prod-build` to rebuild and run containers

### Usage

- to save translation data send a post request to `http://localhost:8080/import-data/` with a JSON in the following format:

  - as an array of _translation units_ :
    ```json
    [
      {
        "source": "I am Arwen - I've come to help you.",
        "target": "Ich bin Arwen - Ich bin gekommen, um dir zu helfen.",
        "sourceLanguage": "en",
        "targetLanguage": "de"
      },
      {
        "source": "Come back to the light.",
        "target": "Komm zurück zum Licht.",
        "sourceLanguage": "en",
        "targetLanguage": "de"
      },
      {
        "source": "Nooo, my precious!!.",
        "target": "Nein, my Schatz!!.",
        "sourceLanguage": "en",
        "targetLanguage": "de"
      }
    ]
    ```
  - or just one _translation unit_
    ```json
    {
      "source": "I love german bureaucracy.",
      "target": "Ich liebe deutsche Bürokratie.",
      "sourceLanguage": "en",
      "targetLanguage": "de"
    }
    ```

- To request a translation go to `http://localhost:8080/` select your subtitle file, target language and email address - just make sure there's already translation data saved as indicated in the previous step :)

- To view resulting email and attachment go to `http://localhost:8080/mail/`
  - Click on an email to view message
  - Click on the`MIME` tab where you can download the resulting subtitle

## Issues i had

- I wanted to use Elasticsearch as it had integrated fuzzy search and wanted to try out a new technology. This became a problem since the learning curve was a bit too high and I couldn't really make it work fast enough. The fuzzy match query also has a strict maximum allowed Levenshtein Edit distance of 2 which would not work considering the requirements of this challenge.
    In the end I stuck with MySQL which for a small sample size does the job - it pulls all translations of the specified target language and calculates distances for each text - I would be curious to see how everything would work with a huge sample size.

- Testing - this is a personal challenge for me as I'm struggling with mocking/stubbing in TS. For example I got stuck trying to mock nodemailer and in the end I switched to Jest from Mocha/Chai as it was easier to work with and mock dependencies. Testing is definitely an area where I want to focus more in the future.

- Issues between TypeORM and ts-node-dev - this ate quite a bit of my time as i couldn't figure out what was going on because of my inexperience with how ts-node-dev actually works. Fixed by providing different ormconfig entities locations based on `NODE_ENV` value which is set when running migrations or starting the service.

- Docker build issues: Builds were not working correctly due to missing tsconfig `rootDir": "./",` which resulted in an improper `dist` folder structure and missing `migrations` folder thus when tested in isolation both dev and prod builds failed to start.
    Another challenge that i had to tackle was that the translation-service was starting too quick and the db server was not ready yet resulting in issues running migrations and connecting to the db. To solve this i added `wait-for-it.sh` to the project folder and build steps. To make things easier as the file had to have the right permissions I added the setup and run scripts which ensures everything is set up properly for local development or production and users can run this project easily.

## What i want to do next

After i make the PR i still want to work on this project as it is a lot of fun

1. Finish tests
2. More error handling and potential bugfixes
3. Add translation caching
4. Swagger consolidation for multiple services
