---
title: 'Building Indian Parliamentary Datasets'
domain: 'Research'
featured: true
order: 3
tech: ['Web Scraping', 'Digitization', 'Data Engineering', 'Computational Social Science']
paper: '/indian-parliament-data-grant.pdf'
summary: 'Princeton research initiative creating the largest unified Indian political dataset — 40+ years of parliamentary debates, 40+ GB of speech audio, and thousands of digitized documents.'
---

A Princeton University Studio Lab research initiative to create the **largest unified dataset** for Indian political linguistic analysis. Engineered a resumable Selenium crawler to index the Parliament Digital Library (handling dynamic pagination and session state), processed **40+ GB of election speech audio** (Modi & Gandhi, 2014/2019 campaigns) through an AWS Transcribe/Translate pipeline, and digitized **40+ years (1981–2024)** of Lok Sabha and Rajya Sabha debates. Designed a PyMuPDF and FuzzyWuzzy text extraction engine to structure thousands of raw PDF statements, mapping OCR output to standardized Ministry entities at scale.
