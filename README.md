Description: This API is a wrapper to the Azure's sentiment analysis api with the language detection API

Setup:

1. Make sure you have installed node, if not download and install the latest version of node
2. Clone the repository to local machine
3. Open terminal and run the command "npm i"
4. To run the server locally use following command "node app.js"
5. Test the server with the following endpoint "http://localhost:5000/"
6. To test the API, send the post request to the following endpoint "http://localhost:5000/sentiments/" with the payload containing the text to do sentimental analysis.
7. For swagger docs, use the following endpoint "http://localhost:5000/docs"

Usage:

Request:

curl -X 'POST' \
 'http://localhost:5000/sentiments/' \
 -H 'accept: application/json' \
 -H 'Content-Type: application/json' \
 -d '{
"text": "The rooms were beautiful but dirty. The AC was good and quiet, but the elevator was broken"
}'

Response:

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

Request:

curl -X 'POST' \
 'http://localhost:5000/sentiments/' \
 -H 'accept: application/json' \
 -H 'Content-Type: application/json' \
 -d '{
"text": "Las habitaciones eran hermosas pero sucias. El aire acondicionado era bueno y silencioso, pero el ascensor estaba roto."
}'

Response:

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
