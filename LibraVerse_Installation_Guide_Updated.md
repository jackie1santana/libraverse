
# Comprehensive Installation Guide for LibraVerse Project Technologies

This guide provides detailed, step-by-step instructions for installing all the necessary technologies and libraries for the LibraVerse project, ensuring a complete setup for development, container orchestration, continuous integration, and API management.

## 1. Development Frameworks and Libraries

### 1.1 Ruby (User Authentication Service)

- Install Rails for Ruby-based services:
  ```bash
  gem install rails
  ```

- Add Devise for authentication:
  ```bash
  echo "gem 'devise'" >> Gemfile
  bundle install
  ```

- Add JWT for JSON Web Tokens:
  ```bash
  echo "gem 'jwt'" >> Gemfile
  bundle install
  ```

### 1.2 Python with Django (Book Management Service)

- Install Django and REST Framework for Python-based services:
  ```bash
  pip install django djangorestframework
  ```

- Add support for JWT in Django:
  ```bash
  pip install djangorestframework-jwt
  ```

### 1.3 Angular (Front-End Application)

- Ensure Node.js and npm are installed, then install Angular CLI and Material:
  ```bash
  npm install -g @angular/cli
  ng add @angular/material
  ```

### 1.4 Golang (AI Book Recognition Service)

- Set up Go Gin for the web framework and AWS SDK for Go if using AWS Rekognition:
  ```bash
  go get -u github.com/gin-gonic/gin
  go get github.com/aws/aws-sdk-go
  ```

### 1.5 React Native (Mobile Application)

- Install the React Native CLI and initialize your project:
  ```bash
  npm install -g react-native-cli
  react-native init LibraVerseMobileApp
  ```

- Add the camera module for React Native:
  ```bash
  npm install react-native-camera --save
  cd ios && pod install && cd ..
  ```

## 2. Cross-Service Technologies

### 2.1 Docker

- Download and install Docker for containerization:
  ```plaintext
  Visit docker.com to download Docker Desktop.
  ```

### 2.2 Terraform

- Install Terraform for infrastructure as code:
  ```bash
  Download Terraform from terraform.io.
  ```

### 2.3 AWS CLI

- Set up AWS CLI for cloud service management:
  ```bash
  pip install awscli
  aws configure
  ```

### 2.4 ULID Generation

- Add ULID support for unique identifiers in your services:
  ```bash
  # Ruby
  echo "gem 'ulid'" >> Gemfile && bundle install
  # Python
  pip install python-ulid
  # Node.js
  npm install ulid
  # Golang
  go get github.com/oklog/ulid
  ```

## 3. Kubernetes and AWS Fargate

### 3.1 Kubernetes (EKS)

- Install `eksctl` to create and manage an EKS cluster:
  ```bash
  # Download and install eksctl
  curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
  sudo mv /tmp/eksctl /usr/local/bin
  ```

- Create an EKS cluster:
  ```bash
  eksctl create cluster --name libraVerseCluster --region your-region --fargate
  ```

### 3.2 AWS Fargate

- Use AWS Fargate for serverless container execution, configured through `eksctl` or the AWS Management Console.

## 4. CircleCI

- Sign up for CircleCI and connect your GitHub or Bitbucket repository.
- Add a `.circleci/config.yml` file to your repository to define your CI/CD pipeline.

## 5. API Gateway (NGINX)

- Install NGINX to serve as an API Gateway:
  ```bash
  sudo apt update
  sudo apt install nginx
  ```
- Configure NGINX for routing, load balancing, and SSL termination according to your service architecture.

By following this guide, you’ll have a robust setup for the LibraVerse project, leveraging modern technologies and practices for scalable, efficient development and deployment.

## 6. Local Kubernetes Setup

### 6.1 Minikube

Minikube is a tool that allows you to run Kubernetes locally. It runs a single-node Kubernetes cluster on your personal computer (including Windows, macOS, and Linux PCs) so you can try out Kubernetes or develop with it day-to-day.

- **Install Minikube**:
  ```bash
  # For macOS
  brew install minikube
  
  # For Linux
  curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
  sudo install minikube-linux-amd64 /usr/local/bin/minikube
  
  # For Windows
  choco install minikube
  ```

- **Start Minikube**:
  ```bash
  minikube start
  ```

### 6.2 Kubectl

Kubectl is a command-line tool that allows you to run commands against Kubernetes clusters. You will use it to deploy applications, inspect and manage cluster resources, and view logs.

- **Install Kubectl**:
  ```bash
  # For macOS
  brew install kubectl
  
  # For Linux
  curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
  sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
  
  # For Windows
  choco install kubernetes-cli
  ```

- **Verify Installation**:
  ```bash
  kubectl version --client
  ```

This section ensures you have the tools needed to run a Kubernetes cluster locally for development and testing purposes before deploying to AWS.
