---
title: 'Generative AI Mental Health Pipeline (BERT & Llama-3)'
domain: 'Machine Learning'
featured: true
order: 2
tech: ['PyTorch', 'Hugging Face', 'LLaMA 3.2', 'LoRA', 'Unsloth', 'TensorFlow']
github: 'https://github.com/PatVraj/mental-health-nlp-pipeline/tree/main'
paper: '/mental-health-classification-chatbot.pdf'
---

Interactive mental-health NLP stack: intent classification and domain-specific responses using **PyTorch**, **Hugging Face Transformers**, and **TensorFlow/Keras**. Fine-tuned **LLaMA 3.2 1B** with **LoRA** adapters (including efficient **QLoRA** via **Unsloth**) for clinical text generation, alongside **BERT**-style classifiers for supervised mental-health labeling. Reached **0.79 Macro-F1** on aggregated clinical data while cutting training VRAM by 50%+; built an ETL pipeline over **53,000+** text samples for fine-tuning.