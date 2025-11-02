---
description: Update coupon data from CSV file
allowed-tools: Read, Write, Edit, Bash
argument-hint: <csv-file-path>
---

# Coupon Data Update from CSV

Update the coupon database by parsing a CSV file and integrating the data into the coupon system.

**CSV File Path**: $ARGUMENTS

## Task: Parse CSV and Update Coupon Data

**SCOPE**: This command reads a CSV file with coupon data, validates it, converts to proper RawCouponData format, updates the coupon data loader, and validates the result.

### Prerequisites

Before running this command, ensure:
1. File `$ARGUMENTS` exists in `src/data/coupons/uploads/`
2. File is a valid CSV with headers: `course_id,coupon_type,coupon_code,start_date,start_time,custom_price`
3. CSV format:
   ```
   course_id,coupon_type,coupon_code,start_date,start_time,custom_price
   6826831,custom_price,2025-11-01,2025-11-01,0:00,1500
   6851913,custom_price,2025-11-02,2025-11-02,0:00,1500
   ```

### 1. Read and Validate CSV File

Read `$ARGUMENTS` to extract:
- course_id (Udemy course ID)
- coupon_type (e.g., "custom_price", "free")
- coupon_code (e.g., "2025-11-01")
- start_date (YYYY-MM-DD format)
- start_time (HH:MM format)
- custom_price (discount price in JPY)

Validate:
- All required columns are present
- course_id values exist in COURSE_INFO
- Dates are in valid YYYY-MM-DD format
- Times are in valid HH:MM or HH:MM:SS format
- custom_price is a valid number

### 2. Transform CSV Data

Convert each CSV row to RawCouponData format:

```typescript
{
  courseId: "6826831",
  couponType: "custom_price",
  maximumRedemptions: "unlimited",
  couponCode: "2025-11-01",
  startDateTime: "2025-11-01T00:00:00-07:00",
  endDateTime: "2025-12-01T23:00:00-08:00", // 1 month later
  currency: "JPY",
  discountPrice: 1500,
}
```

**Rules for transformation**:
- `courseId`: Use CSV's course_id as-is
- `couponType`: Use CSV's coupon_type as-is
- `maximumRedemptions`: Always set to "unlimited"
- `couponCode`: Use CSV's coupon_code as-is
- `startDateTime`: Combine start_date + start_time with PDT timezone (-07:00)
  - Format: "YYYY-MM-DDTHH:MM:SS-07:00"
  - Example: "2025-11-01T00:00:00-07:00"
- `endDateTime`: Set to 1 month after startDateTime with PDT timezone (-08:00, accounting for DST)
  - Format: "YYYY-MM-DDTHH:MM:SS-08:00"
  - Example: "2025-12-01T23:00:00-08:00"
- `currency`: Always set to "JPY"
- `discountPrice`: Use CSV's custom_price as a number

### 3. Merge with Existing Coupon Data

1. Read current `src/lib/coupons/coupon-data.ts` file
2. Extract existing COUPON_DATA array
3. For each CSV row:
   - If courseId already exists in COUPON_DATA, update the entry
   - If courseId is new, append to COUPON_DATA array
4. Maintain existing coupons that are not in the CSV
5. Keep the array in chronological order by startDateTime

### 4. Update the Coupon Data File

Update `src/lib/coupons/coupon-data.ts`:

1. Replace the COUPON_DATA array with merged data:
   ```typescript
   const COUPON_DATA: RawCouponData[] = [
     {
       courseId: "6826831",
       couponType: "custom_price",
       maximumRedemptions: "unlimited",
       couponCode: "2025-11-01",
       startDateTime: "2025-11-01T00:00:00-07:00",
       endDateTime: "2025-12-01T23:00:00-08:00",
       currency: "JPY",
       discountPrice: 1500,
     },
     // ... other entries ...
   ]
   ```

### 5. Validate Changes

Run validation checks:
```bash
npm run type-check && npm run lint && npm run test
```

If validation fails:
- Verify all courseIds exist in COURSE_INFO
- Check date formats are correct
- Ensure discountPrice is a valid number
- Review timezone offsets

### 6. Report Results

After successful update, provide:
1. ✅ Parse status (success/failure)
2. 📊 Data summary:
   - Number of coupons parsed from CSV
   - Number of new coupons added
   - Number of existing coupons updated
   - Course IDs processed
3. 🔍 Validation results:
   - Type check status
   - Lint status
   - Test status
4. 📝 Changes made:
   - List of updated course IDs
   - List of new course IDs
5. 💾 File updated:
   - Location: `src/lib/coupons/coupon-data.ts`
   - Total entries in COUPON_DATA array

## Error Handling

If errors occur:
- **File not found**: Verify CSV file exists at `$ARGUMENTS`
- **Invalid CSV format**: Check headers and data rows match expected format
- **Invalid course ID**: Verify courseId exists in `src/constants/coupon-courses.ts`
- **Invalid date format**: Use YYYY-MM-DD for dates and HH:MM for times
- **Type errors**: Review RawCouponData interface in `src/types/coupon.ts`
- **Test failures**: Review existing coupon data tests in `src/lib/coupons/__tests__/coupon-data.test.ts`

## Output Format

Provide clear, structured output:
```
✅ CSV Coupon Update Complete

📊 Data Summary:
- CSV rows parsed: X
- New coupons added: X
- Existing coupons updated: X
- Course IDs: [list of IDs]

🔍 Validation:
✅ Type check passed
✅ Lint passed
✅ Tests passed (X tests)

💾 File Updated:
- Location: src/lib/coupons/coupon-data.ts
- Total entries: X entries in COUPON_DATA array

✨ Coupon data successfully updated!
```
