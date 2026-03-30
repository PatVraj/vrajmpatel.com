---
title: 'Generative AI Mental Health Pipeline (BERT & Llama-3)'
domain: 'Machine Learning'
featured: true
order: 3
---

- Engineered a hierarchical NLP classification pipeline by fine-tuning BERT with PyTorch and Hugging Face Transformers, achieving a 0.79 Macro-F1 score across 7 clinical mental health categories through rigorous hyperparameter tuning and Early Stopping
- Architected a resource-efficient LLM workflow utilizing 4-bit QLoRA quantization to fine-tune Llama-3.2-1B with Unsloth, reducing VRAM usage by 50%+
- Orchestrated a Supervised Fine-Tuning (SFT) loop using the TRL (Transformer Reinforcement Learning) library to align model outputs with Cognitive Behavioral Therapy (CBT) protocols, integrating a dynamic prompt injection system that conditions responses based on real-time sentiment analysis
- Developed a robust ETL pipeline processing 53,000+ clinical text samples using Pandas and Regular Expressions, implementing Stratified Sampling and custom PyTorch Dataset classes to mitigate class imbalance and optimize tokenization throughput