# crypto-shop

## 1. Introduction  
This project is a proof of concept that uses microservices, REST controllers, AMQP messaging protocol, websockets and 3rd party services.

There are 2 applications: one application for a usual user which sees data about products, and the second application is designed for admins, having rights to perform CRUD operations on products.

The webserver application is a NestJS project. The main entry point is composed by REST controllers. These controllers use services that send commands in the RabbitMQ queues from where the microservices can perform the desired operation. The microservices are responsible for the communication with the DB, being able to create/modify entries.

For the 2 web apps I used Angular. The admin app represents a host for the login and register components taken from users' app with Module Federation. The user's web app is connected to a websocket and receives events when modifications occur to products list. 

## 2. Diagrams 
The diagrams below, designed based on the c4 models, describe better the current project.

### 2.1. Context Diagram
![](https://github.com/AntonelaPrica/crypto-shop/blob/main/diagrams/context%20diagram.drawio.png)

### 2.2. Container Diagram
![](https://github.com/AntonelaPrica/crypto-shop/blob/main/diagrams/container%20diagram.drawio.png)

### 2.3. Component Diagram
![](https://github.com/AntonelaPrica/crypto-shop/blob/main/diagrams/component%20diagram.drawio.png) 

### 2.4. Code Diagram
The size of this diagram is too big, but can be generated automatically by IntelliJ IDE.
You need to select the desired package for which you need the diagram, right click, then select 'Diagrams' > 'Show Diagrams'.

## 3. Project configuration

Start by cloning this project on your workstation.

``` sh
git clone https://github.com/AntonelaPrica/crypto-shop.git
```

The next thing will be to install all the dependencies of the project.

```sh
cd ./crypto-shop
npm install
```

Run servers in the following order:

```sh
nx serve --project=products-service
nx serve --project=users-service
nx serve --project=api-gateway
nx serve --project=ui-user
nx serve --project=ui-admin
```
