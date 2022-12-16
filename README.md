# Sentimental Analysis API

This API is a wrapper to the [Azure's sentiment analysis API](https://learn.microsoft.com/en-us/azure/cognitive-services/language-service/sentiment-opinion-mining/overview) with the [language detection API](https://learn.microsoft.com/en-us/azure/cognitive-services/language-service/language-detection/overview)

[Sentimental Analysis](https://en.wikipedia.org/wiki/Sentiment_analysis) is an analysis to identify the emotions of the particular conversation or the text.

![image](https://monkeylearn.com/static/30607381159c995d7e967c1f0530e50f/920fd/how-does-sentiment-analysis-work%402x.png)
ref: https://monkeylearn.com/sentiment-analysis/

# Development

The Azure's sentiment analysis API and language detection API are integrated with this API. A call to this API will internally call the Azure's Language detection API to identify the language, if the confidence of the API is above 80%, then a payload is created with the text and the identified language. This payload is sent to the Azure's Sentimental Analysis and results are fetched and sent as the response to the request.

The request made to the APIs are asynchronous and [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) is used for calling the APIs and waiting for their responses.

**Environment And Libraries Used**
SentimentalAnalysis API:

- Protocol used: HTTP
- Development language: Node.js - Express.js
- Libraries: @azure/ai-text-analytics, swagger-jsdoc, swagger-ui-express
- API Checker : swagger

# Try Out

Temporarily the API is hosted in one of the droplets in Digital Ocean, to run some tests and checkout the functionality

### Server Endpoint

```
http://162.243.172.115:5000/
```

### API Endpoint

```
http://162.243.172.115:5000/api/v1/sentiments/
```

### Post Request Body

```JSON
{"text": "<Your Text or Conversation goes here>"}
```

## Possible Responses :

| Response code | Description             |
| ------------- | ----------------------- |
| 200           | OK                      |
| 400           | Input Validation Failed |
| 500           | Internal Server Error   |

#

### Output:

Contains the object with identified language, overall sentiment and confidences along with analysis of each sentences in the provided text

## Swagger

Swagger for the API added for testing the API withing the host

```
http://162.243.172.115:5000/docs
```

# Setup in Local

1. Create [Azure language resource](https://azure.microsoft.com/en-us/products/cognitive-services/language-service/#overview) and copy the Key and Endpoint
2. Set the Key and Endpoint to the enviroment variables with variable names as _LANGUAGE_KEY_ and _LANGUAGE_ENDPOINT_
3. Make sure you have installed node, if not download and install the latest version of node
4. Clone the repository to local machine
5. Open terminal and run the command "npm i"
6. To run the server locally use following command "node app.js"
7. Test the server with the following endpoint "http://localhost:5000/"
8. To test the API, send the post request to the following endpoint "http://localhost:5000/api/v1/sentiments/" with the payload containing the text to do sentimental analysis.
9. For swagger docs, use the following endpoint "http://localhost:5000/docs"

# Usage:

**Request:**

```
curl -X 'POST' \
  'http://162.243.172.115:5000/api/v1/sentiments/' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "text": "The rooms were beautiful but dirty. The AC was good and quiet, but the elevator was broken"
}'
```

**Response:**

```JSON
{
  "language": "English",
  "sentiment": "negative",
  "confidenceScores": {
    "positive": 0,
    "neutral": 0,
    "negative": 0.99
  },
  "sentences": [
    {
      "text": "The rooms were beautiful but dirty. ",
      "sentiment": "negative",
      "confidenceScores": {
        "positive": 0.01,
        "neutral": 0.01,
        "negative": 0.99
      },
      "opinions": [
        {
          "text": "rooms",
          "sentiment": "mixed",
          "confidenceScores": {
            "positive": 0.5,
            "negative": 0.5
          },
          "assessments": [
            {
              "text": "beautiful",
              "sentiment": "positive"
            },
            {
              "text": "dirty",
              "sentiment": "negative"
            }
          ]
        }
      ]
    },
    {
      "text": "The AC was good and quiet, but the elevator was broken",
      "sentiment": "negative",
      "confidenceScores": {
        "positive": 0,
        "neutral": 0,
        "negative": 1
      },
      "opinions": [
        {
          "text": "AC",
          "sentiment": "positive",
          "confidenceScores": {
            "positive": 1,
            "negative": 0
          },
          "assessments": [
            {
              "text": "good",
              "sentiment": "positive"
            },
            {
              "text": "quiet",
              "sentiment": "positive"
            }
          ]
        },
        {
          "text": "elevator",
          "sentiment": "negative",
          "confidenceScores": {
            "positive": 0.01,
            "negative": 0.99
          },
          "assessments": [
            {
              "text": "broken",
              "sentiment": "negative"
            }
          ]
        }
      ]
    }
  ]
}
```

**Request:**

```
curl -X 'POST' \
  'http://162.243.172.115:5000/api/v1/sentiments/' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "text": "Las habitaciones eran hermosas pero sucias. El aire acondicionado era bueno y silencioso, pero el ascensor estaba roto."
}'

```

**Response:**

```JSON
{
  "language": "Spanish",
  "sentiment": "negative",
  "confidenceScores": {
    "positive": 0.02,
    "neutral": 0,
    "negative": 0.98
  },
  "sentences": [
    {
      "text": "Las habitaciones eran hermosas pero sucias. ",
      "sentiment": "negative",
      "confidenceScores": {
        "positive": 0.03,
        "neutral": 0.01,
        "negative": 0.96
      },
      "opinions": [
        {
          "text": "habitaciones",
          "sentiment": "positive",
          "confidenceScores": {
            "positive": 0.51,
            "negative": 0.49
          },
          "assessments": [
            {
              "text": "hermosas",
              "sentiment": "positive"
            },
            {
              "text": "sucias",
              "sentiment": "negative"
            }
          ]
        }
      ]
    },
    {
      "text": "El aire acondicionado era bueno y silencioso, pero el ascensor estaba roto.",
      "sentiment": "negative",
      "confidenceScores": {
        "positive": 0,
        "neutral": 0,
        "negative": 1
      },
      "opinions": [
        {
          "text": "aire acondicionado",
          "sentiment": "positive",
          "confidenceScores": {
            "positive": 1,
            "negative": 0
          },
          "assessments": [
            {
              "text": "bueno",
              "sentiment": "positive"
            },
            {
              "text": "silencioso",
              "sentiment": "positive"
            }
          ]
        },
        {
          "text": "ascensor",
          "sentiment": "negative",
          "confidenceScores": {
            "positive": 0.04,
            "negative": 0.96
          },
          "assessments": [
            {
              "text": "roto",
              "sentiment": "negative"
            }
          ]
        }
      ]
    }
  ]
}
```
