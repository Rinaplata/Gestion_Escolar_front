pipeline {
  agent any

  stages {
    stage('Clonar Repo'){
      git branch: 'main', url: 'https://github.com/eldelahoz/Gestion_Escolar_front.git'
    }
    
    stage('Construir Imagen Docker'){
      script {
        def image = docker.build("gestionescolar-front")
      }
    }
  }
  
  post {
        always {
            sh 'docker system prune -f'
        }
    }
}
