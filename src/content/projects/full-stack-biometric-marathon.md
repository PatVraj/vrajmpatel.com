---
title: 'Full-Stack Biometric Marathon Platform (SeeMyRace)'
domain: 'Machine Learning'
featured: true
order: 2
---

- Architected a full-stack web application using Flask (MVC) and Docker, integrating a PostgreSQL (pgvector) backend to enable sub-50ms semantic facial recognition search of race participants
- Engineered an asynchronous ingestion pipeline that decouples heavy TorchVision and DeepFace inference from the main server thread, ensuring UI responsiveness and <100ms latency during bulk image uploads
- Implemented a hybrid identification algorithm combining 128-dim vector embeddings with a custom OpenCV adaptive thresholding OCR pipeline, boosting athlete retrieval recall by ~30% on high-variance images (glare, truncated/crumpled bibs)
- Developed an interactive admin portal using Jinja2 and Vanilla JS to parse GPX data for dynamic map rendering, allowing race organizers to visualize athlete locations via extracted EXIF GPS metadata