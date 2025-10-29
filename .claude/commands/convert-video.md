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
3. Format follows the pattern:
   ```typescript
   // https://www.youtube.com/watch?v=VIDEO_ID
   // # タイトル
   // 動画タイトル
   // # 概要欄
   // 概要欄の内容...
   ```

### 1. Read Source File

Read `src/data/videos/$ARGUMENTS.ts` to extract:
- Video URL
- Title
- Published date
- Description sections (opening, learning points, timestamps)
- Tags
- Related videos
- Udemy courses
- Custom sections

### 2. Convert to VideoMetadata Format

Transform the commented data into proper TypeScript structure:

```typescript
import { commonSections } from "@/data/shared/common-sections"
import type { VideoMetadata } from "@/types/video"

export const video_$ARGUMENTS: VideoMetadata = {
  id: "$ARGUMENTS",
  title: "extracted_title",
  publishedAt: "YYYY-MM-DD",
  videoUrl: "https://www.youtube.com/watch?v=$ARGUMENTS",

  opening: {
    lines: [/* opening paragraphs */]
  },

  learningPoints: {
    title: "💡 この動画で学べること",
    items: [/* learning points */]
  },

  timestamps: {
    title: "⏰ タイムスタンプ",
    items: [
      { time: "00:00", label: "label" }
    ]
  },

  tags: [/* hashtags */],

  // Optional sections based on content
  customSections: [/* if applicable */],
  udemyCourses: {/* if applicable */},
  relatedVideos: {/* if applicable */},

  // Common sections
  social: commonSections.social,
  discordCommunity: commonSections.discordCommunity,
  engagement: commonSections.engagement,
}
```

**Important**:
- Use `video_` prefix for export name: `video_$ARGUMENTS`
- Infer `learningPoints` from description if not explicitly marked
- Parse timestamps in "HH:MM label" format
- Extract tags from hashtags at the end
- Map Udemy sections to `udemyCourses` type with proper structure
- Map related videos to `relatedVideos` type with proper structure

### 3. Register in Video Data Loader

Update `src/lib/videos/video-data.ts`:

1. Add import at the top:
   ```typescript
   import { video_$ARGUMENTS } from "@/data/videos/$ARGUMENTS"
   ```

2. Add to `allVideosData` array in chronological order based on `publishedAt`:
   ```typescript
   const allVideosData: VideoMetadata[] = [
     // ... existing videos ...
     video_$ARGUMENTS,
     // ... other videos ...
   ]
   ```

### 4. Validate Result

Run validation checks:
```bash
npm run type-check && npm run lint
```

If validation fails:
- Fix type errors by adjusting the structure
- Ensure all required fields are present
- Verify optional fields match their types

### 5. Report Results

After successful conversion, provide:
1. ✅ Conversion status (success/failure)
2. 📊 Data summary:
   - Video title
   - Published date
   - Number of timestamps
   - Number of tags
   - Optional sections included (customSections, udemyCourses, relatedVideos)
3. 🔍 Validation results (type-check and lint)
4. 📝 Next steps if applicable

## Error Handling

If errors occur:
- **File not found**: Verify `src/data/videos/$ARGUMENTS.ts` exists
- **Type errors**: Review VideoMetadata interface in `src/types/video.ts`
- **Lint errors**: Fix formatting and naming issues
- **Parse errors**: Check commented data format

## Output Format

Provide clear, structured output:
```
✅ Video Data Conversion Complete

📊 Video Information:
- ID: $ARGUMENTS
- Title: [extracted title]
- Published: YYYY-MM-DD
- Timestamps: X items
- Tags: X items
- Sections: [list of included optional sections]

🔍 Validation:
✅ Type check passed
✅ Lint passed

✨ Video successfully registered in data loader!
```
