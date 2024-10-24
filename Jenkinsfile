pipeline {
  agent any

  stages {
    stage('Clonar Repo'){
      steps{
        git branch: 'main', url: 'https://github.com/eldelahoz/Gestion_Escolar_front.git'  
      }
    }
    
    stage('Construir Imagen Docker'){
      steps{
        script {
        def image = docker.build("gestionescolar-front")
        }
      }
    }
  }
}
