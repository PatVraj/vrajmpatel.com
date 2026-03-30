---
title: 'Real-Time NLP Detection Engine (HateBlocker)'
domain: 'Machine Learning'
featured: false
order: 4
---

- Architected a real-time detection system coupling a Chrome Extension frontend with a Python FastAPI backend, achieving <1s inference latency on live Twitter feeds by efficiently processing dynamic DOM content
- Engineered a metadata-augmented NLP pipeline achieving 90.72% test accuracy (0.89 Weighted F1) by stacking TF-IDF vectors with 16 custom linguistic features (e.g., capitalization ratios, punctuation density) to train a robust XGBoost classifier
- Optimized production inference by implementing a Strategy design pattern to dynamically hot-swap between Deep Learning (fine-tuned BERT) and Classical ML backends via environment variables, ensuring gradient-free execution using torch.no_grad()