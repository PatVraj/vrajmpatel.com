---
title: 'Automated Interview Scoring Engine'
domain: 'Machine Learning'
featured: false
order: 7
tech: ['SentenceTransformers', 'TensorFlow', 'Scikit-Learn', 'SHAP']
github: 'https://github.com/PatVraj/automated-interview-scoring'
summary: 'Multimodal pipeline fusing text embeddings and 100+ audio features to predict interview scores. MAE < 0.4, Pearson r > 0.70 with human raters.'
---

Designed a **multimodal predictive regression pipeline** fusing dense text embeddings (`sentence-transformers/all-mpnet-base-v2`) with **100+ prosodic audio features** (pitch variance, speech rate, pause density). Used **Cosine Similarity** over multi-turn dialogue structures to model conversational coherence. Deployed **K-Fold Cross-Validation** (k=5) to minimize prediction error, achieving **MAE < 0.4** on normalized score predictions and **Pearson r > 0.70** correlation with human rater scores. Applied **SHAP** explainability to identify which linguistic and tonal features most strongly predicted candidate ratings across competency dimensions.