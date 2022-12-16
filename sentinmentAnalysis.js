"use strict";

const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

const languageKey = process.env.LANGUAGE_KEY;
const languageEndpoint = process.env.LANGUAGE_ENDPOINT;

const textAnalyticsClient = new TextAnalyticsClient(languageEndpoint, new AzureKeyCredential(languageKey));

function processResponse(results, language) {
    let res = {};
    res['language'] = language;
    try {
        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            if (!result.error) {
                res['sentiment'] = result.sentiment;
                res['confidenceScores'] = result.confidenceScores;
                res['sentences'] = [];
                for (const { sentiment, confidenceScores, opinions, text } of result.sentences) {
                    let sentence = {};
                    sentence['text'] = text;
                    sentence['sentiment'] = sentiment;
                    sentence['confidenceScores'] = confidenceScores;
                    sentence['opinions'] = [];
                    for (const { target, assessments } of opinions) {
                        let opinion = {};
                        opinion['text'] = target.text;
                        opinion['sentiment'] = target.sentiment;
                        opinion['confidenceScores'] = target.confidenceScores;
                        opinion['assessments'] = [];

                        for (const { text, sentiment } of assessments) {
                            let assessment = {};
                            assessment['text'] = text;
                            assessment['sentiment'] = sentiment;
                            opinion['assessments'].push(assessment);
                        }

                        sentence['opinions'].push(opinion);
                    }

                    res['sentences'].push(sentence);
                }
            } else {
                res['error'] = result.error;
            }
        }
    } catch (ex) {
        res['error'] = ex;
    }
    return res;
}


exports.sentimentAnalysisWithOpinionMining = (text) => {

    return new Promise((resolve, reject) => {
        textAnalyticsClient.detectLanguage([text])
            .then(results => {
                if (results.length > 0) {
                    if (results[0].primaryLanguage.confidenceScore >= 0.8) {
                        const language = results[0].primaryLanguage;
                        const sentimentInput = [{ text: text, id: "0", language: language.iso6391Name }];
                        textAnalyticsClient.analyzeSentiment(sentimentInput, { includeOpinionMining: true })
                            .then(results => {
                                let data = processResponse(results, language.name);
                                resolve(data);
                            })
                            .catch(error => reject(error));
                    } else {
                        reject({ 'error': 'Confidence Score of identified the language is below 80%' });
                    }

                } else {
                    reject({ 'error': 'Unable to identify the language' });
                }
            }).catch(err => reject(err))
    });
}