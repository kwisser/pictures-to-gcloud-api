# Picture to Google Cloud Api

Endpoint which receives urls of pictures and downloads them to google cloud storage

## Prepare GCP

1. Create Storage Bucket
2. Create Repository in Artifact Registry
3. Place your storage key from google cloud storage in `src/storage_key.json`
4. Go to . directory and enter `gcloud builds submit --tag ZONE-docker.pkg.dev/PROJECT_ID/REPOSITORY_NAME/picture-api`
5. Create Cloud Run with build Image from last command

## Sample Request

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
