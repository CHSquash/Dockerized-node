build:
	docker build -f Dockerfile -t b.gcr.io/rugged-cooler-143304.appspot.com/express_server .

start:
	docker run -d -p 3000:3000 --name express_server b.gcr.io/rugged-cooler-143304.appspot.com/express_server

clean:
	docker rm $$(docker ps -q -f status=exited) || echo 'true'
	docker rmi $$(docker images -q --filter "dangling=true") || echo 'true'
	docker volume rm $$(docker volume ls -qf dangling=true) || echo 'true'

push:
	gcloud docker push b.gcr.io/rugged-cooler-143304.appspot.com/express_server
