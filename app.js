const express = require("express");
const bodyParser = require("body-parser")
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { sentimentAnalysisWithOpinionMining } = require('./sentinmentAnalysis');

const app = express();
app.use(bodyParser.json());
const port = 5000;


const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Final Project APIs",
            description: "List of APIs created for final project",
            contact: {
                name: "Kiran Samatham",
                email: "ksamatha@uncc.edu"
            },
            servers: ["http://0.0.0.0:5000"]
        }
    },
    apis: ["app.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.get('/', (req, res) => {
    res.redirect('/docs');
})


/**
 * @swagger
 * /sentiments/:
 *   post:
 *     summary: Get sentiment of input text which is in any language
 *     description: Add the text or the conservation of anylanguage for which context sentiment has to be identified
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Result of sentimental analysics along with identified language
 *       400:
 *         description: Invalid Input, must be JSON object with text attribute
 *       500:
 *         description: For any server errors, please try again
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Input Text"
 *       required: true
 *       schema:
 *         properties:
 *           text:
 *             type: string
 *             example: "I had the best day of my life."
 */
app.post("/sentiments/", (req, res, next) => {
    const data = req.body;
    if (data.text) {
        sentimentAnalysisWithOpinionMining(data.text)
            .then(result => {
                try {
                    res.status(200).send(result);
                } catch (error) {
                    console.log(error);
                }

            })
            .catch(err => res.status(500).send({ 'error': err }));
    } else {
        res.status(400).send({ 'error': 'Invalid input, must contain text attribute in the json object' })
    }

});


app.listen(port, () => {
    console.log("Server is running at ", port);
});


