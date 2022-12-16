# Sentimental Analysis API

This API is a wrapper to the [Azure's sentiment analysis API](https://learn.microsoft.com/en-us/azure/cognitive-services/language-service/sentiment-opinion-mining/overview) with the [language detection API](https://learn.microsoft.com/en-us/azure/cognitive-services/language-service/language-detection/overview)

[Sentimental Analysis](https://en.wikipedia.org/wiki/Sentiment_analysis) is an analysis to identify the emotions of the particular conversation or the text.

![image](https://www.google.com/url?sa=i&url=https%3A%2F%2Fmonkeylearn.com%2Fsentiment-analysis%2F&psig=AOvVaw0Eiw-aX-iXDc-dI--mjUfR&ust=1671249537465000&source=images&cd=vfe&ved=0CA4QjRxqFwoTCIDyrOmf_fsCFQAAAAAdAAAAABAE)

# Development

The Azure's sentiment analysis API and language detection API are integrated with this API. A call to this API will internally call the Azure's Language detection API to identify the language, if the confidence of the API is above 80%, then a payload is created with the text and the identified language. This payload is sent to the Azure's Sentimental Analysis and results are fetched and sent as the response to the request.

The request made to the APIs are asynchronous and [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) is used for calling the APIs and waiting for their responses.

**Environment And Libraries Used**
SentimentalAnalysis API:

- Protocol used: HTTP
- Development language: Node.js - Express.js
- Libraries: @azure/ai-text-analytics, swagger-jsdoc, swagger-ui-express
- API Checker : swagger

# Setup in Local

1. Make sure you have installed node, if not download and install the latest version of node
2. Clone the repository to local machine
3. Open terminal and run the command "npm i"
4. To run the server locally use following command "node app.js"
5. Test the server with the following endpoint "http://localhost:5000/"
6. To test the API, send the post request to the following endpoint "http://localhost:5000/api/v1/sentiments/" with the payload containing the text to do sentimental analysis.
7. For swagger docs, use the following endpoint "http://localhost:5000/docs"

# Usage:

**Request:**

curl -X 'POST' \
 'http://localhost:5000/api/v1/sentiments/' \
 -H 'accept: application/json' \
 -H 'Content-Type: application/json' \
 -d '{
"text": "The rooms were beautiful but dirty. The AC was good and quiet, but the elevator was broken"
}'

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

curl -X 'POST' \
 'http://162.243.172.115:5000/api/v1/sentiments/' \
 -H 'accept: application/json' \
 -H 'Content-Type: application/json' \
 -d '{
"text": "Las habitaciones eran hermosas pero sucias. El aire acondicionado era bueno y silencioso, pero el ascensor estaba roto."
}'

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
