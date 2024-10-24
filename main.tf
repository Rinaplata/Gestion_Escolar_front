terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0.2"
    }
  }

  required_version = ">= 1.1.0"
}

resource "null_resource" "az_login" {
  provisioner "local-exec" {
    command = <<EOT
      az login --username "${azure_username}" --password "${azure_password}"
    EOT
  }
}

provider "azurerm" {
  features {}
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
      
     
      docker build -t ${azurerm_container_registry.imagenes_perso.login_server}/gestionescolar-front:latest .

     
      docker push ${azurerm_container_registry.imagenes_perso.login_server}/gestionescolar-front:latest
    EOT
  }

  depends_on = [azurerm_container_registry.imagenes_perso]
}
