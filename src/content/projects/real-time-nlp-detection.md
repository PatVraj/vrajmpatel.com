---
title: 'Real-Time NLP Detection Engine (HateBlocker)'
domain: 'Machine Learning'
featured: false
order: 5
tech: ['FastAPI', 'BERT', 'XGBoost', 'TF-IDF', 'Chrome Extension', 'JavaScript']
github: 'https://github.com/PatVraj/hate-blocker/tree/main'
summary: 'Chrome extension + FastAPI backend that detects and hides toxic content on web pages. BERT reached 91.5% accuracy on a 24,800-tweet dataset.'
---

**HateBlocker** pairs a **Chrome extension** (content scripts, JavaScript/HTML/CSS) with a **FastAPI** backend to score text on web pages and hide hateful or offensive content—similar to an ad blocker for toxic language. Trained on the Davidson **Hate Speech and Offensive Language** dataset (~**24,800** labeled tweets): stacked **5,000**-dimensional **TF-IDF** with linguistic metadata (tweet length, punctuation, hashtags). **BERT** sequence classification reached **91.5%** accuracy; **XGBoost** reached **90.72%**, with SVM, logistic regression, random forest, and naive Bayes as baselines for a three-way **hateful / offensive / neither** task.