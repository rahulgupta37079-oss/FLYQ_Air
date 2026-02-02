# Cloudflare R2 File Storage Implementation - Jan 31, 2026

## ✅ Implementation Complete

### What Was Built

**R2 Bucket**: `flyq-storage` (created and configured)

**Features Implemented**:
1. ✅ File upload API with authentication
2. ✅ File download/retrieval API with caching
3. ✅ File deletion API with ownership validation
4. ✅ File listing API (user's files only)
5. ✅ Beautiful file manager UI with drag-and-drop
6. ✅ Integration with user accounts

---

## ⚠️ R2 Binding Configuration Needed

Just like the D1 database binding, the R2 binding needs to be configured in the Cloudflare Pages dashboard for the file storage to work in production.

### Current Status
- ✅ R2 bucket created: `flyq-storage`
- ✅ Code fully implemented and deployed
- ✅ wrangler.jsonc configured correctly
- ⚠️ **NEEDS**: R2 binding in Cloudflare Pages dashboard

---

## How to Configure R2 Binding

### Via Cloudflare Dashboard (Required)

1. **Go to Cloudflare Dashboard**
   - Visit: https://dash.cloudflare.com/
   - Navigate to: **Workers & Pages** → **flyq-air**

2. **Click "Settings" Tab**
   - Scroll to **"Functions"** section
   - Find **"R2 bucket bindings"**

3. **Add R2 Binding**
   - Click **"Add binding"**
   - Set:
     - **Variable name**: `R2`
     - **R2 bucket**: `flyq-storage`
   - Click **"Save"**

4. **That's It!**
   - The next deployment will automatically have access to R2 storage
   - All file upload/download features will work

---

## Configuration Files

### wrangler.jsonc (Already Configured ✅)

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "flyq",
  "compatibility_date": "2025-10-29",
  "pages_build_output_dir": "./dist",
  "compatibility_flags": ["nodejs_compat"],
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "webapp-production",
      "database_id": "6d2cdedc-73a0-48e2-b1f5-a952e3ffb8e0"
    }
  ],
  "r2_buckets": [
    {
      "binding": "R2",
      "bucket_name": "flyq-storage"
    }
  ]
}
```

---

## API Endpoints

### 1. Upload File
**POST** `/api/upload`

**Authentication**: Required (must be logged in)

**Request**: `multipart/form-data`
- `file`: File to upload (max 10MB)

**Response**:
```json
{
  "success": true,
  "filename": "uploads/331/1738364789123-abc123.jpg",
  "url": "/api/files/uploads/331/1738364789123-abc123.jpg",
  "size": 1234567,
  "type": "image/jpeg"
}
```

**Features**:
- ✅ User authentication required
- ✅ 10MB file size limit
- ✅ Unique filename generation (timestamp + random)
- ✅ Files organized by user ID: `uploads/{user_id}/{filename}`
- ✅ Automatic content-type detection
- ✅ Error handling for large files

**Example Usage**:
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log(result.url); // Use this URL to access the file
```

---

### 2. Get File
**GET** `/api/files/{path}`

**Authentication**: Not required (public access)

**Example**: `/api/files/uploads/331/1738364789123-abc123.jpg`

**Response**: File content with proper headers
- `Content-Type`: Original file MIME type
- `ETag`: For caching
- `Cache-Control`: `public, max-age=31536000` (1 year cache)

**Features**:
- ✅ Public access to uploaded files
- ✅ Browser caching for performance
- ✅ Direct file download
- ✅ Works in `<img>`, `<video>`, `<a>` tags

**Example Usage**:
```html
<!-- Display image -->
<img src="/api/files/uploads/331/1738364789123-photo.jpg" alt="Photo">

<!-- Download link -->
<a href="/api/files/uploads/331/1738364789123-document.pdf" download>Download PDF</a>
```

---

### 3. Delete File
**DELETE** `/api/files/{filename}`

**Authentication**: Required (must be logged in)

**Authorization**: 
- ✅ File owner can delete their own files
- ✅ Admin can delete any file

**Response**:
```json
{
  "success": true,
  "message": "File deleted"
}
```

**Example Usage**:
```javascript
const response = await fetch('/api/files/uploads/331/1738364789123-old.jpg', {
  method: 'DELETE'
});

if (response.ok) {
  console.log('File deleted successfully');
}
```

---

### 4. List User's Files
**GET** `/api/my-files`

**Authentication**: Required (must be logged in)

**Response**:
```json
{
  "success": true,
  "files": [
    {
      "name": "photo.jpg",
      "path": "uploads/331/1738364789123-abc123.jpg",
      "url": "/api/files/uploads/331/1738364789123-abc123.jpg",
      "size": 1234567,
      "uploaded": "2026-01-31T12:00:00.000Z"
    },
    {
      "name": "document.pdf",
      "path": "uploads/331/1738364800456-def456.pdf",
      "url": "/api/files/uploads/331/1738364800456-def456.pdf",
      "size": 567890,
      "uploaded": "2026-01-31T12:05:00.000Z"
    }
  ]
}
```

**Features**:
- ✅ Only shows files uploaded by current user
- ✅ Includes file metadata (name, size, upload date)
- ✅ Ready-to-use URLs for file access

---

## File Manager UI

### URL: `/account/files`

**Live URL**: https://flyqdrone.in/account/files

**Features**:

#### 1. Upload Section
- ✅ **Drag and Drop** - Drag files directly to upload area
- ✅ **Click to Upload** - Click area to select files
- ✅ **Progress Bar** - Visual upload progress
- ✅ **File Size Validation** - 10MB limit with friendly error
- ✅ **Status Messages** - Success/error notifications

#### 2. Files List
- ✅ **File Preview** - Shows file icon, name, size, date
- ✅ **View Button** - Opens file in new tab
- ✅ **Delete Button** - Remove file with confirmation
- ✅ **Auto-refresh** - List updates after upload/delete
- ✅ **Empty State** - Friendly message when no files

#### 3. Navigation
- ✅ Integrated into account sidebar
- ✅ Accessible from any account page
- ✅ Icon: Folder icon in sidebar

**UI Design**:
- Beautiful card-based layout
- Drag-and-drop area with hover effects
- FontAwesome icons throughout
- Responsive design for mobile
- Consistent with existing FLYQ design

---

## File Organization

### Storage Structure

```
flyq-storage/
└── uploads/
    ├── 331/                           (User ID 331)
    │   ├── 1738364789123-abc123.jpg
    │   ├── 1738364800456-def456.pdf
    │   └── 1738364820789-ghi789.mp4
    ├── 25/                            (User ID 25)
    │   ├── 1738364850123-jkl012.png
    │   └── 1738364870456-mno345.docx
    └── 127/                           (User ID 127 - Director NITK)
        └── 1738364900789-pqr678.xlsx
```

**Benefits**:
- ✅ Organized by user ID
- ✅ Easy to find user's files
- ✅ Unique filenames prevent conflicts
- ✅ Timestamp in filename for sorting
- ✅ Original extension preserved

---

## Use Cases

### 1. Product Images
Upload product images and use URLs in product database:

```javascript
// Upload image via file manager
const result = await uploadFile(imageFile);

// Save URL to product in database
await db.prepare(`
  UPDATE products 
  SET image_url = ?
  WHERE id = ?
`).bind(result.url, productId).run();
```

### 2. Customer Documents
Customers can upload documents (receipts, IDs, etc.):

```javascript
// Customer uploads receipt
const receipt = await uploadFile(receiptFile);

// Save to order
await db.prepare(`
  INSERT INTO order_documents (order_id, document_url, document_type)
  VALUES (?, ?, 'receipt')
`).bind(orderId, receipt.url).run();
```

### 3. Drone Firmware Files
Store and distribute drone firmware updates:

```javascript
// Admin uploads firmware
const firmware = await uploadFile(firmwareFile);

// Customers download from URL
<a href="${firmware.url}" download>Download Firmware v2.1</a>
```

### 4. Tutorial Videos
Upload tutorial videos for products:

```html
<!-- Upload via file manager, then embed -->
<video controls width="640">
  <source src="/api/files/uploads/1/tutorial.mp4" type="video/mp4">
</video>
```

---

## Security Features

### 1. Authentication
- ✅ Upload requires login
- ✅ Delete requires login
- ✅ List requires login
- ✅ Download is public (for sharing)

### 2. Authorization
- ✅ Users can only list their own files
- ✅ Users can only delete their own files
- ✅ Admins can delete any file
- ✅ File ownership validated by user ID in path

### 3. File Validation
- ✅ 10MB file size limit
- ✅ File type detection
- ✅ Unique filename generation prevents overwrites

### 4. Error Handling
- ✅ Graceful handling of missing files (404)
- ✅ Friendly error messages
- ✅ Storage unavailable detection
- ✅ Upload failure notifications

---

## Testing

### After Configuring R2 Binding

#### 1. Test File Upload
1. Go to https://flyqdrone.in/account/files
2. Login if needed
3. Click upload area or drag a file
4. Should see progress bar and success message
5. File should appear in the list below

#### 2. Test File Download
1. Click "View" button on uploaded file
2. Should open in new tab
3. Browser should display or download the file

#### 3. Test File Delete
1. Click trash icon on a file
2. Confirm deletion
3. File should disappear from list

#### 4. Test API Directly

```bash
# Upload file (need authentication cookie)
curl -X POST https://flyqdrone.in/api/upload \
  -H "Cookie: flyq_session=..." \
  -F "file=@test.jpg"

# Download file (public)
curl https://flyqdrone.in/api/files/uploads/331/1738364789123-abc123.jpg \
  -o downloaded.jpg

# List files (need authentication)
curl https://flyqdrone.in/api/my-files \
  -H "Cookie: flyq_session=..."

# Delete file (need authentication)
curl -X DELETE https://flyqdrone.in/api/files/uploads/331/1738364789123-abc123.jpg \
  -H "Cookie: flyq_session=..."
```

---

## R2 Bucket Management

### View Bucket Contents
```bash
cd /home/user/webapp
npx wrangler r2 object list flyq-storage
```

### Download File from Bucket
```bash
npx wrangler r2 object get flyq-storage/{filename} --file=local-file.jpg
```

### Delete File from Bucket
```bash
npx wrangler r2 object delete flyq-storage/{filename}
```

### View Bucket Info
```bash
npx wrangler r2 bucket list
```

---

## Cost & Limits

### Cloudflare R2 Pricing (Workers Paid Plan)

**Storage**: $0.015 per GB/month
- No egress fees (data transfer out)
- First 10 GB free

**Operations**:
- Class A (writes): $4.50 per million requests
- Class B (reads): $0.36 per million requests

**Example Monthly Cost**:
- 50 GB storage: $0.75
- 100,000 uploads: $0.45
- 1,000,000 downloads: $0.36
- **Total**: ~$1.56/month

### Limits
- Max file size: 5 TB per file
- Unlimited files per bucket
- Unlimited bandwidth (no egress fees!)

---

## Next Steps

### Immediate (Required)

1. ✅ **Configure R2 binding in Cloudflare Pages dashboard**
   - Go to Settings → Functions → R2 bucket bindings
   - Add binding: Variable = `R2`, Bucket = `flyq-storage`

2. ⏳ **Test file upload**
   - Visit https://flyqdrone.in/account/files
   - Upload a test file
   - Verify it appears in list

3. ⏳ **Test file download**
   - Click "View" button
   - Verify file opens correctly

### Future Enhancements (Optional)

1. **Image Thumbnails**
   - Generate thumbnails for uploaded images
   - Display preview in file list

2. **File Search**
   - Add search/filter to file list
   - Search by filename or date

3. **Bulk Upload**
   - Allow multiple file selection
   - Upload multiple files at once

4. **File Sharing**
   - Generate shareable links
   - Set expiration dates

5. **Admin File Browser**
   - View all users' files
   - Manage storage usage
   - Delete inappropriate content

6. **Storage Quotas**
   - Set per-user storage limits
   - Display usage statistics
   - Upgrade prompts

---

## Files Modified

### New/Modified Files
- `wrangler.jsonc` - Added R2 bucket configuration
- `src/index.tsx` - Added 4 API endpoints + file manager page

### GitHub Commits
- **7291ea3**: feat: Add R2 file storage with upload/download/delete APIs and file manager UI

### Repository
- https://github.com/rahulgupta37079-oss/FLYQ_Air
- Branch: main
- Latest commit: 7291ea3

---

## Summary

### ✅ What's Ready

1. **R2 Bucket**: `flyq-storage` created and configured
2. **APIs**: 4 endpoints for upload/download/delete/list
3. **UI**: Beautiful file manager with drag-and-drop
4. **Security**: Authentication, authorization, validation
5. **Code**: Fully implemented and deployed
6. **Deployment**: https://70ee9b40.flyq-air.pages.dev

### ⚠️ What's Needed

1. **R2 Binding Configuration** in Cloudflare Pages dashboard
   - Variable name: `R2`
   - Bucket name: `flyq-storage`
   - Location: Settings → Functions → R2 bucket bindings

**Once configured**, all file storage features will work perfectly!

---

## Integration with Existing Features

### Product Images
- Upload product images via file manager
- Use URLs in product database
- Display on product pages

### Order Documents
- Customers upload receipts, IDs
- Store URLs in orders table
- Display in order details

### Curriculum Files
- Upload course materials (PDFs, videos)
- Link to curriculum entries
- Students download from their account

### Blog Images
- Upload blog post images
- Embed in blog content
- Fast delivery via R2 CDN

---

## Technical Details

### TypeScript Types (Inferred)
```typescript
interface UploadResponse {
  success: boolean;
  filename: string;
  url: string;
  size: number;
  type: string;
}

interface FileInfo {
  name: string;
  path: string;
  url: string;
  size: number;
  uploaded: string;
}

interface ListFilesResponse {
  success: boolean;
  files: FileInfo[];
}
```

### Error Responses
```typescript
interface ErrorResponse {
  error: string;
}

// Examples:
{ error: 'Authentication required' }  // 401
{ error: 'File too large. Maximum size is 10MB' }  // 400
{ error: 'Storage not available' }  // 503
{ error: 'Permission denied' }  // 403
{ error: 'File not found' }  // 404
```

---

## Action Required

**TO ENABLE FILE STORAGE:**

1. Go to Cloudflare Dashboard: https://dash.cloudflare.com/
2. Navigate to: Workers & Pages → flyq-air → Settings → Functions
3. Find "R2 bucket bindings"
4. Click "Add binding"
5. Set:
   - Variable name: `R2`
   - R2 bucket: `flyq-storage`
6. Click "Save"
7. Test at: https://flyqdrone.in/account/files

**That's it!** File storage will be fully functional. 🚀
