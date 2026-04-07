# Cat® ECS 200 — Specification Navigator

A self-contained, single-file web application for browsing and searching the Cat® ECS 200 specification documentation suite.

## How to Use

1. **Open the app** — Double-click `ECS-200-Spec-Navigator.html` in your browser (Chrome, Edge, Firefox, or Safari all work).
2. **Browse documents** — Use the sidebar to select a document, or read the detailed summaries on the Overview dashboard.
3. **Search** — Type any term in the search box (e.g., "load share", "ethernet", "temperature") to find every section where that topic appears across all 5 manuals.
4. **Open source PDF** — Click any section card, subsection, or search result "Open PDF → p.XX" button to open the source PDF at the exact page.

## Requirements

- A modern web browser (Chrome, Edge, Firefox, Safari)
- All 5 PDF files must remain **in the same folder** as the HTML file
- No internet connection required — everything runs locally
- No installation needed

## Included Documents

| Document ID     | Title                                     | Pages |
|-----------------|-------------------------------------------|-------|
| LEBE20713-01    | Controller Hardware Manual                | 29    |
| LEBE20715-02    | HMI Manual – Paralleling Genset Control   | 280   |
| LEBE20716-02    | Software Operations Manual – Paralleling  | 420   |
| LEBE20720-00    | Balance of Plant Software Manual          | 159   |
| LEBE23522-00    | ECS SCADA Modbus Software Manual          | 91    |

## Troubleshooting

- **PDFs won't open?** Make sure the PDF files are in the same folder as the HTML file and haven't been renamed.
- **Page doesn't jump to the right section?** The `#page=N` feature depends on your browser's built-in PDF viewer. Chrome and Edge work best. If your browser downloads the PDF instead of opening it, try a different browser.
