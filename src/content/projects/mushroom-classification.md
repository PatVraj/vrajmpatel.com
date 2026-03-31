---
title: 'Mushroom Classification Data Science'
domain: 'Machine Learning'
featured: false
order: 9
tech: ['K-Means', 'GMM', 'Scikit-Learn', 'Pandas', 'NumPy']
github: 'https://github.com/PatVraj/mushroom-classification/tree/main'
paper: '/mushroom-ds.pdf'
---

Clustering-driven study of **edible vs. poisonous** mushrooms on **61,069** records (**173** species, **20** attributes) from a Kaggle morphological dataset. Ran **K-Means** on numeric traits (e.g. cap diameter, stem height and width) and **Gaussian mixture models** across **k = 1–11** with an elbow-style analysis, landing on **five** components with about **68%** representation purity. Incorporated **Jaccard**-style distances for categorical features to capture species overlap and relate morphology to toxicity.
