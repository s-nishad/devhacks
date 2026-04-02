# AWS Master Roadmap
![Cloud Engineer](https://img.shields.io/badge/Cloud%20Engineer-333?style=for-the-badge)
![DevOps](https://img.shields.io/badge/DevOps-555?style=for-the-badge)
![Solutions Architect](https://img.shields.io/badge/Solutions%20Architect-777?style=for-the-badge)
---

## PHASE 1 - FUNDAMENTALS 

---

### Introduction to AWS

> Topics

- [ ] Cloud Computing Concepts  
- [ ] [AWS Global Infrastructure](https://aws.amazon.com/about-aws/global-infrastructure/)  
- [ ] [AWS Free Tier](https://aws.amazon.com/free/)  
- [ ] [AWS Pricing models (On-demand, Reserved, Spot)](https://aws.amazon.com/pricing/)  
- [ ] [Cost Explorer & Billing Dashboard](https://aws.amazon.com/aws-cost-management/aws-cost-explorer/)  

> Practice

- [ ] Create AWS Free Tier account  

---

### IAM AND AWS CLI

> Topics

- [Identity and Access Management](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html)  
- [Security best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)  
- [CLI setup and commands](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)  

> Practice

- [ ] Create IAM users, groups, roles  
- [ ] Configure AWS CLI  
- [ ] Run basic CLI commands  

---

### STORAGE SERVICES

> Topics

- [S3 (Simple Storage Service)](https://docs.aws.amazon.com/s3/index.html)  
- [EBS (Elastic Block Store)](https://docs.aws.amazon.com/ebs/)  
- [EFS (Elastic File System)](https://docs.aws.amazon.com/efs/)  

> Practice

- [ ] Create S3 buckets  
- [ ] Upload and download files  
- [ ] Configure bucket policies  

---

## PHASE 2 - COMPUTE AND NETWORKING

---

### EC2 AND AUTO SCALING

> Topics

- [EC2 instances and AMIs](https://docs.aws.amazon.com/ec2/)  
- [Instance types and pricing](https://aws.amazon.com/ec2/pricing/)  
- [Auto Scaling concepts](https://docs.aws.amazon.com/autoscaling/)  
- [Multi-AZ architecture](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html)  
- Failover strategies  
- Auto Scaling policies  

> Practice

- [ ] Launch EC2 instances  
- [ ] Connect using SSH  
- [ ] Configure Auto Scaling  

---

### VPC AND NETWORKING

> Topics

- [VPC architecture](https://docs.aws.amazon.com/vpc/)  
- Subnets and routing  
- Security Groups and NACL  

> Practice

- [ ] Create custom VPC  
- [ ] Configure subnets  
- [ ] Setup routing  

---

### LOAD BALANCING

> Topics

- [Elastic Load Balancer types](https://docs.aws.amazon.com/elasticloadbalancing/)  
- Health checks  
- Traffic routing  

> Practice

- [ ] Create Application Load Balancer  
- [ ] Configure target groups  
- [ ] Test load balancing  

---

### DNS & CONTENT DELIVERY

> Topics

- [Route 53 (DNS)](https://docs.aws.amazon.com/route53/)  
- [CloudFront (CDN)](https://docs.aws.amazon.com/cloudfront/)  

> Practice

- [ ] Configure domain using Route53  
- [ ] Deploy static site with CloudFront  

---

## PHASE 3 - DATABASES AND SERVERLESS

---

### DATABASE SERVICES

> Topics

- [RDS (MySQL/PostgreSQL)](https://docs.aws.amazon.com/rds/)  
- [DynamoDB](https://docs.aws.amazon.com/dynamodb/)  
- [ElastiCache](https://docs.aws.amazon.com/elasticache/)  
- RDS vs DynamoDB (use cases)  
- Read Replicas  
- Multi-AZ vs Single-AZ  

> Practice

- [ ] Launch RDS instance  
- [ ] Create DynamoDB tables  
- [ ] Connect database from EC2  
- [ ] Implement caching using ElastiCache  

---

### SERVERLESS COMPUTING

> Topics

- [AWS Lambda](https://docs.aws.amazon.com/lambda/)  
- [API Gateway](https://docs.aws.amazon.com/apigateway/)  
- Serverless architecture  

> Practice

- [ ] Create Lambda functions  
- [ ] Build API using API Gateway  
- [ ] Integrate services  

---

### EVENT SYSTEMS

> Topics

- [SNS](https://docs.aws.amazon.com/sns/)  
- [SQS](https://docs.aws.amazon.com/sqs/)  
- Event-driven architecture  
- Fan-out pattern  
- Retry mechanisms  
- Decoupling systems  

> Practice

- [ ] Create SNS topics  
- [ ] Setup SQS queues  
- [ ] Build event workflow  

---

## PHASE 4 - DEVOPS AND MONITORING

---

### DEVOPS SERVICES

> Topics

- [CloudFormation](https://docs.aws.amazon.com/cloudformation/)  
- Terraform (Infrastructure as Code)  
- [CodePipeline](https://docs.aws.amazon.com/codepipeline/)  
- CodeBuild and CodeDeploy  

> Practice

- [ ] Create CloudFormation template  
- [ ] Write Terraform for EC2/VPC  
- [ ] Store Terraform state in S3  
- [ ] Build CI/CD pipeline  
- [ ] Deploy application  

---

### CONTAINERS & ORCHESTRATION

> Topics

- [Amazon ECR](https://docs.aws.amazon.com/ecr/)  
- [Amazon ECS](https://docs.aws.amazon.com/ecs/)  
- Task definitions and services  
- Fargate vs EC2 launch type  

> Practice

- [ ] Build Docker image  
- [ ] Push image to ECR  
- [ ] Deploy container using ECS  
- [ ] Run service with load balancer  

---

### CI/CD & MODERN AUTHENTICATION

> Topics

- CI/CD concepts (build, test, deploy)  
- [GitHub Actions](https://docs.github.com/en/actions)  
- OIDC authentication  
- IAM Role for GitHub Actions  
- STS (temporary credentials)  

> Practice

- [ ] Setup GitHub Actions pipeline  
- [ ] Configure OIDC with AWS  
- [ ] Deploy to AWS without access keys  
- [ ] Automate Docker build & push to ECR  

---

### REAL WORLD PIPELINE (ECR → ECS)

> Flow

- Code push → GitHub  
- GitHub Actions builds Docker image  
- Push image to ECR  
- Deploy updated image to ECS  

> Practice

- [ ] Build full CI/CD pipeline  
- [ ] Auto deploy on push  
- [ ] Update ECS service automatically  

---

### MONITORING AND LOGGING

> Topics

- [CloudWatch](https://docs.aws.amazon.com/cloudwatch/)  
- [CloudTrail](https://docs.aws.amazon.com/cloudtrail/)  
- [AWS X-Ray](https://docs.aws.amazon.com/xray/)  
- Logs, Metrics, Alerts  
- Distributed tracing  

> Practice

- [ ] Setup CloudWatch dashboards  
- [ ] Enable CloudTrail  
- [ ] Monitor applications  

---

### ARCHITECTURE PATTERNS

> Topics

- Monolith vs Microservices  
- Serverless architecture  
- Event-driven systems  

---

### CAPSTONE PROJECTS

> Topics

- Highly available systems  
- Serverless pipelines  

> Practice

- [ ] Deploy multi-AZ application  
- [ ] Build serverless pipeline  

---

### SECURITY AND BEST PRACTICES

> Topics

- [AWS security best practices](https://docs.aws.amazon.com/security/)  
- [Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/)  
- Cost optimization  
- Encryption (at rest & in transit)  
- [KMS basics](https://docs.aws.amazon.com/kms/)  
- Disaster Recovery (RTO, RPO, backups, cross-region)  

> Practice

- [ ] Perform security audit  
- [ ] Apply best practices  
- [ ] Optimize costs  

---

## PHASE 5 - SYSTEM DESIGN 

---

### SYSTEM DESIGN PRACTICE

> Topics

- Design scalable systems  
- Trade-offs (cost vs performance)  
- High availability architecture  
- Fault tolerance  

> Practice

- [ ] Design URL shortener  
- [ ] Design food delivery system  
- [ ] Design chat system  
- [ ] Design file upload system  

---
> HAPPY AWSing!