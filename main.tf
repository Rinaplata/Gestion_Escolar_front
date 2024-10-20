terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.1"
    }
  }
}

provider "docker" {
  host = "npipe:////.//pipe//docker_engine"
}

resource "docker_image" "front" {
  name         = "gestionescolar-front:latest"
  keep_locally = false
}

resource "docker_container" "front" {
  image = docker_image.front.image_id
  name  = "gestion-escolar-front"
  ports {
    internal = 80
    external = 5371
  }
}
