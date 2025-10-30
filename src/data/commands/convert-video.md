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
- Timestamps (with titles and timestamps in HH:MM:SS format)
- Tags

### 2. Convert to VideoMetadata Format

Transform the data into proper TypeScript VideoMetadata structure:

```typescript
export const videoData: VideoMetadata = {
  id: '$ARGUMENTS',
  url: '...',
  title: '...',
  publishedAt: '...',
  description: '...',
  timestamps: [
    { title: '...', timestamp: '...' }
  ],
  tags: [...]
}
```

### 3. Register in Video Data Loader

Add the new video to `src/lib/videos/video-data.ts`:

1. Import the new video data file
2. Add to the videos array in the correct position
3. Ensure proper ordering (newest first or by category)

### 4. Validate Result

Verify the conversion:
- Run TypeScript type checker: `npm run type-check`
- Build the project: `npm run build`
- Check that video appears on `/videos` page

### 5. Cleanup

Remove commented data from the original file if conversion was successful.

## Error Handling

If any step fails:
- Keep the original commented data intact
- Report the error with specific details
- Do not modify `video-data.ts` if validation fails
