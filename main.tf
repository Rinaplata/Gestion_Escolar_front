terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0.2"
    }
  }

  required_version = ">= 1.1.0"
}

variable "azure_username" {
  type = string
}

variable "azure_password" {
  type = string
}

provider "azurerm" {
  features {}
}

resource "null_resource" "az_login" {
  provisioner "local-exec" {
    command = <<EOT
      az login --username "${var.azure_username}" --password "${var.azure_password}"
    EOT
  }
}

data "azurerm_resource_group" "existing" {
  name     = "gestion_escolar"
}

resource "azurerm_container_registry" "imagenes_perso" {
  name                = "miACRuniversidad"
  resource_group_name = data.azurerm_resource_group.existing.name
  location            = data.azurerm_resource_group.existing.location
  sku                 = "Basic"
}

resource "null_resource" "docker_push" {
  provisioner "local-exec" {
    command = <<EOT
      
      az acr login --name ${azurerm_container_registry.imagenes_perso.name}
      docker tag gestionescolar-front:latest ${azurerm_container_registry.imagenes_perso.login_server}/gestionescolar-front:latest
      docker push ${azurerm_container_registry.imagenes_perso.login_server}/gestionescolar-front:latest
    EOT
  }

  depends_on = [azurerm_container_registry.imagenes_perso]
}

resource "azurerm_container_group" "gestionescolar" {
  name                = "gestionescolar-container-group"
  location            = data.azurerm_resource_group.existing.location
  resource_group_name = data.azurerm_resource_group.existing.name
  os_type             = "Linux"

  container {
    name   = "gestionescolar-front-container"
    image  = "${azurerm_container_registry.imagenes_perso.login_server}/gestionescolar-front:latest"
    cpu    = "0.5"
    memory = "1.5"

    ports {
      port     = 80
      protocol = "TCP"
    }
  }

  image_registry_credential {
    server   = azurerm_container_registry.imagenes_perso.login_server
    username = azurerm_container_registry.imagenes_perso.admin_username
    password = azurerm_container_registry.imagenes_perso.admin_password
  }
  depends_on = [azurerm_container_registry.imagenes_perso]
}

output "acr_username" {
  value = azurerm_container_registry.imagenes_perso.admin_username
}

output "acr_password" {
  value = azurerm_container_registry.imagenes_perso.admin_password
}
