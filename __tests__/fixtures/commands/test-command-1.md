---
description: Convert YouTube video data from commented format to VideoMetadata TypeScript
allowed-tools: Read, Write, Edit, Bash
argument-hint: <youtube-video-id>
---

# YouTube Video Data Conversion

Convert a YouTube video data file from commented format to proper VideoMetadata TypeScript structure.

**YouTube Video ID**: $ARGUMENTS

## Task: Convert Video Data File

**SCOPE**: This command reads a video file with commented YouTube data, converts it to proper VideoMetadata format, registers it in the video data loader, and validates the result.

### Prerequisites

Before running this command, ensure:
1. File `src/data/videos/$ARGUMENTS.ts` exists
2. File contains commented YouTube data (title, description, timestamps, tags)

### 1. Read Source File

Read `src/data/videos/$ARGUMENTS.ts` to extract:
- Video URL
- Title
- Published date
- Description
- Timestamps
- Tags
