# Pictures to Google Cloud Storage API

This is a Google Cloud Function that handles uploading pictures to Google Cloud Storage.

## Environment Variables

Create a `.env` file with the following variables:

```
BUCKET_NAME=your-bucket-name
PROJECT_ID=your-project-id
PORT=8083
```

## Local Development

1. Install dependencies:
   ```
   npm install
   ```

2. Run the development server:
   ```
   npm run dev
   ```

## Deployment to Google Cloud Functions

1. Make sure you have the Google Cloud SDK installed and configured.

2. Set up Application Default Credentials:
   ```
   gcloud auth application-default login
   ```

3. Deploy the function:
   ```
   npm run deploy
   ```

   Or manually:
   ```
   gcloud functions deploy picturesApi --runtime nodejs18 --trigger-http --allow-unauthenticated
   ```

4. For environment variables in production, you can set them during deployment:
   ```
   gcloud functions deploy picturesApi \
     --runtime nodejs18 \
     --trigger-http \
     --allow-unauthenticated \
     --set-env-vars BUCKET_NAME=your-bucket-name,PROJECT_ID=your-project-id
   ```

## API Endpoints

### POST /addPictures
Uploads pictures to Google Cloud Storage.

Request body:
```json
{
  "_id": "user-id",
  "photos": [
    {
      "url": "https://example.com/image.jpg",
      "fileName": "image.jpg"
    }
  ]
}
```

### GET /
Returns the current status of picture uploads.

Response:
```json
{
  "picturesToDownload": 0
}
```

## Sample Request

Post `https://your_domain.com/addPictures`

```json
{
    "_id": "61940b495bf7af0100ade054",
    "photos": [
        {
            "id": "43d4fca7-26c1-44dd-955d-bdc36",
            "fileName": "ziege1.jpg",
            "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hausziege_04.jpg/1200px-Hausziege_04.jpg"
        },
        {
            "id": "cb1f53ab-37asfdf-44bd-g590-c2e9cfa7df45",
            "fileName": "ziege2.jpg",
            "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hausziege_04.jpg/1200px-Hausziege_04.jpg"
        },
        {
            "id": "853b47ac-6basafas120-5g1d043c4a26",
            "fileName": "ziege3.jpg",
            "url": "https://www.br.de/kinder/eine-ziege-100~_v-img__3__4__xl_-f4c197f4ebda83c772171de6efadd3b29843089f.jpg"
        }
    ]
}
```