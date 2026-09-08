---
title: 'Indian Parliamentary Data'
domain: 'Research'
featured: true
order: 2
visibility: 'public'
tech: ['Python', 'Selenium', 'SQLite', 'AWS', 'Google Cloud', 'Azure', 'Deepgram', 'PyMuPDF']
summary: "A restartable pipeline that turns parliamentary documents and campaign audio into structured research data."
contribution: "I evaluated speech and translation tools at Studio Lab, then built the end-to-end pipeline at Princeton."
setting: "CU Boulder Studio Lab · Princeton University"
status: "Princeton appointment completed · May 2026"
proof:
  - value: "40+ GB of audio"
    label: "2014 and 2019 campaign recordings processed after tool evaluation."
  - value: "Multi-decade archives"
    label: "Lok Sabha and Rajya Sabha records collected for research."
  - value: "Thousands of PDFs"
    label: "Parliamentary statements parsed and mapped to standardized ministry names."
systemPath:
  - title: 'Tool evaluation'
    purpose: 'Speech and translation services are compared against the needs of the research workflow before they become pipeline dependencies.'
    technical: 'At Studio Lab, I set up WER-oriented comparisons across Deepgram, Google Speech-to-Text, Amazon Transcribe, and Azure Speech, plus translation comparisons across Google, AWS, and Azure services.'
  - title: 'Archive scraping'
    purpose: 'Dynamic parliamentary pages and documents become a recoverable source collection.'
    technical: 'At Princeton, I built the Selenium scraping logic, handled pagination, and persisted progress in SQLite so long collection runs could resume.'
  - title: 'End-to-end orchestration'
    purpose: 'Audio, page metadata, and documents move through one inspectable research workflow.'
    technical: 'The workflow coordinates source capture, speech and translation processing, PDF text extraction, and intermediate artifacts instead of relying on disconnected one-off scripts.'
  - title: 'Data structuring'
    purpose: 'Inconsistent records become formats that researchers can inspect and analyze.'
    technical: 'PyMuPDF extraction, metadata normalization, and fuzzy ministry-name mapping produce structured outputs for downstream analysis.'
  - title: 'Recovery and review'
    purpose: 'A failed stage can restart without discarding completed work or hiding transformation decisions.'
    technical: 'Saved state, intermediate outputs, and reviewable mappings keep processing recoverable and normalization decisions auditable.'
overview:
  problem: "Political archives span dynamic pages, long recordings, PDFs, and inconsistent ministry names. Researchers need traceable outputs without restarting hours of collection after an interruption."
  built: "I designed comparative speech and translation evaluations at Studio Lab. In a later Princeton appointment, I built archive scraping, orchestration, PDF extraction, normalization, and resumable processing."
---

## Studio Lab: evaluation phase

At CU Boulder’s Studio Lab, my primary work was comparative research. I designed word-error-rate evaluations across Deepgram, Google Speech-to-Text, Amazon Transcribe, and Azure Speech, then set up parallel translation comparisons across Google Cloud Translation, Amazon Translate, and Azure Translator. I also researched configuration and language-adaptation options for political names and domain-specific vocabulary.

The goal was not to promote one vendor. It was to understand how standard tools behaved on the project’s material and identify which components fit the workflow.

## Princeton: engineering phase

Under the later Princeton appointment, I built the scraping logic and orchestrated the workflow end to end. That included dynamic Parliament Digital Library pagination, resumable SQLite state, speech and translation processing for more than 40 GB of 2014 and 2019 campaign audio, PDF text extraction with PyMuPDF, and structured outputs for further analysis.

I parsed thousands of parliamentary statements and used fuzzy matching to map inconsistent ministry names into a standardized research representation. Checkpoints and intermediate artifacts made long-running jobs restartable and kept transformations open to review.

## Engineering decisions

- Evaluate interchangeable services before embedding one vendor into the research workflow.
- Persist collection state so interrupted sessions can resume near the failure rather than restarting.
- Keep raw source material, intermediate text, and normalized outputs distinct so transformations can be inspected.
- Treat source text and fuzzy matching as assistive normalization inputs that still need review, not unquestioned ground truth.
- Separate the campaign-audio corpus from the parliamentary-document corpus so scale and date claims are not merged.

## Research context

This project spanned two separate paid appointments: Studio Lab at CU Boulder (January 21–April 13, 2024) and Princeton (January 15, 2025–May 2026), with continued research collaboration between them. [Experience](/experience) lists the roles and their distinct contributions.
