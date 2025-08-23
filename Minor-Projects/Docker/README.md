## Docker Test Application

This is a small Docker app for testing purposes.

### Build the Docker Image

```sh
docker build --build-arg MONGO_URL=<your-mongo-url>?authSource=admin -t my-app .
```

### Run the Container

Make sure to run the container in the same network as the services were composed defined in `.yaml` file:

```sh
docker run --network <network_name> -d my-app
```