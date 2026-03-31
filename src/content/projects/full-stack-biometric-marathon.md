---
title: 'Full-Stack Biometric Marathon Platform (SeeMyRace)'
domain: 'Machine Learning'
featured: true
order: 1
tech: ['Flask', 'Docker', 'PostgreSQL', 'DeepFace', 'PaddleOCR', 'Google Drive API']
github: 'https://github.com/techphd/SeeMyRace'
privateRepo: true
---

**SeeMyRace** is a full-stack, **Dockerized** Flask platform for race photography—**Google Drive** ingest, bib and selfie search, and **Google OAuth**. I led **bib-number detection** research (including **SWT**), shipped much of the **main site UI**, **flagging** and moderation flows, and **backend connectors** into the ML **inference** pipeline. For **OCR**, I evaluated **Tesseract** and **PaddleOCR**; **PaddleOCR** looked strongest for our task, but at the time its docs skewed **Chinese**-heavy and were hard to operationalize for a lean **MVP**.

I architected **DeepFace**-based semantic facial recognition targeting **sub-50ms** inference and an **asynchronous ingestion pipeline** that kept heavy model work off the request path, with UI staying responsive (**under 100ms**) during bulk uploads. Separately, the product’s face matching also relies on **PostgreSQL** with **pgvector** (**cosine similarity** over embeddings)—that **vector search** path wasn’t my direct implementation focus. The repo has since gained contributors and more CV plumbing (e.g. **YOLOv8**, **InsightFace**), while goals stay aligned.