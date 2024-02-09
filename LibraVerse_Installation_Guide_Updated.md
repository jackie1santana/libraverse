
# Comprehensive Installation Guide for LibraVerse Project Technologies

This guide outlines the installation process for the technologies involved in the LibraVerse project, focusing on development, containerization, orchestration, and micro-frontend integration using Federation with TypeScript, React 18, Angular, and React Native for mobile development.

## 1. Development Frameworks and Libraries

### Ruby (User Authentication Service)
- Install Rails and required gems for authentication:
  ```bash
  gem install rails
  echo "gem 'devise'" >> Gemfile
  echo "gem 'jwt'" >> Gemfile
  bundle install
  ```

### Python with Django (Book Management Service)
- Install Django and Django REST Framework:
  ```bash
  pip install django djangorestframework
  pip install djangorestframework-jwt
  ```

### Golang (AI Book Recognition Service)
- Setup Go environment and libraries:
  ```bash
  go get -u github.com/gin-gonic/gin
  go get github.com/aws/aws-sdk-go
  ```

## 2. Front-End Development

### Angular Application
- Install Angular CLI and Angular Material:
  ```bash
  npm install -g @angular/cli
  ng add @angular/material
  ```

### React with TypeScript (Web Application)
- Create a React TypeScript project and upgrade to React 18:
  ```bash
  npx create-react-app my-app --template typescript
  cd my-app
  npm install react@18 react-dom@18
  ```

### React Native (Mobile Application)
- Install React Native CLI and initialize the project:
  ```bash
  npm install -g react-native-cli
  react-native init LibraVerseMobileApp --template react-native-template-typescript
  npm install react-native-camera --save
  cd ios && pod install && cd ..
  ```

## 3. Adding Real-Time Notifications and Live Chat for React

To implement real-time notifications and live chat in your React application, consider using the following packages:

- **Socket.IO**: For real-time, bidirectional and event-based communication.
  ```bash
  npm install socket.io-client
  ```

- **Firebase**: As an alternative or complementary solution, especially for notifications.
  ```bash
  npm install firebase
  ```

These packages allow you to integrate real-time features into your React app effectively.

## 4. Federation Setup for Micro Frontends

### Integrating Angular and React with Module Federation
- Install Webpack Module Federation plugins in both Angular and React projects:
  ```bash
  # For React project
  npm install @module-federation/module-federation-plugin
  # For Angular project, use custom builders that support Module Federation
  ng add @angular-architects/module-federation
  ```

## 5. Containerization with Docker

- Install Docker Desktop from the official website.

## 6. Kubernetes and AWS Fargate Orchestration

### Kubernetes Cluster Setup in AWS EKS
- Use `eksctl` to create and manage an EKS cluster integrated with AWS Fargate.

## 7. Continuous Integration with CircleCI

- Setup CI/CD pipelines with CircleCI by connecting your repositories and adding `.circleci/config.yml`.

## 8. Infrastructure as Code with Terraform

- Download and install Terraform from the official site.

## 9. API Gateway Integration with NGINX

- Install NGINX and configure as your API Gateway.

## 10. Local Kubernetes Setup with Minikube

- Install Minikube for local Kubernetes cluster simulation:
  ```bash
  brew install minikube # macOS
  choco install minikube # Windows
  ```

## 11. Cross-Service Technologies

### Docker
- For containerization across all services.

### Terraform
- To define and provision AWS infrastructure.

### AWS CLI
- For managing AWS services.

### ULID Support
- Ensure unique identifier generation across services.

This comprehensive setup ensures the development of the LibraVerse project with the latest in front-end, back-end technologies, and real-time interaction features.
