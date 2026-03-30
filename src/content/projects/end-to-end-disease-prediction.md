---
title: 'End-to-End Disease Prediction Pipeline'
domain: 'Machine Learning'
featured: false
order: 5
---

- Architected a dynamic Deep Learning classifier achieving 75.5% accuracy, implementing Neural Architecture Search with Keras Tuner (Hyperband) to automatically optimize network topology (depth/width) and dropout rates
- Optimized training efficiency on the BRFSS 2015 dataset by engineering a multi-stage coarse-to-fine GridSearchCV pipeline for SVMs and TensorFlow Callbacks (EarlyStopping), reducing computational overhead by ~40%
- Engineered model interpretability modules to demystify "black box" predictions, integrating SHAP (DeepExplainer) to translate raw tensor weights into risk factors (identifying BMI & GenHlth as primary drivers)