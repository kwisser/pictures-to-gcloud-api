# download-picture-to-gcloud-api

## Prepare GCP

1. Create Storage Bucket
2. Create Repository in Artifact Registry
3. Place your storage key from google cloud storage in `src/storage_key.json`
4. Go to . directory and enter `gcloud builds submit --tag ZONE-docker.pkg.dev/PROJECT_ID/REPOSITORY_NAME/picture-api`
5. Create Cloud Run with build Image from last command
