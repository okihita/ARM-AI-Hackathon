terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# 1. GCS (like S3)
resource "google_storage_bucket" "g-cav-raw-data-prod" {
  name          = "${var.project_id}-raw-data-prod"
  location      = "US" # Multi-region for high availability
  force_destroy = true # Good for hackathons, allows easy deletion
}

resource "google_storage_bucket" "g-cav-data-packages-prod" {
  name          = "${var.project_id}-data-packages-prod"
  location      = "US"
  force_destroy = true
}

# 2. Pub/Sub (like SNS/EventBridge)
resource "google_pubsub_topic" "file_uploads" {
  name = "file-uploads-topic"
}

# 3. Docker repo
resource "google_artifact_registry_repository" "docker_repo" {
  location      = "us-central1" # Or your chosen region
  repository_id = "g-cav-repo"
  description   = "Docker repository for G-CAV project"
  format        = "DOCKER"
}