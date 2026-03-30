---
title: 'Automated Interview Scoring Engine'
domain: 'Machine Learning'
featured: false
order: 6
---

- Engineered a semantic alignment algorithm using SentenceTransformers (MiniLM) and Cosine Similarity, converting unstructured multi-turn dialogue into structured datasets by mapping responses to a reference question bank (threshold > 0.40)
- Architected a multimodal predictive regression pipeline using TensorFlow/Keras and Scikit-Learn, achieving a 0.74 Pearson correlation by fusing dense text embeddings with 100+ prosodic audio features (pitch, jitter, pause duration) into a unified input tensor
- Optimized model interpretability and feature selection by deploying SHAP (SHapley Additive exPlanations) and Mutual Information Regression, isolating the top 15 critical behavioral indicators (e.g., lexical diversity, sentiment consistency) to reduce dimensionality and prevent overfitting
- Deployed a robust validation framework using K-Fold Cross-Validation (k=4) and Gradient Boosting Regressors, reducing relative prediction error to 8% by iteratively tuning hyperparameters (learning rate, tree depth) to minimize Mean Absolute Error (MAE)