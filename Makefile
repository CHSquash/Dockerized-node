build:
	docker build -f Dockerfile -t node_server .

start:
	docker run -d -p 3000:3000 --link mysql --name node node_server

clean:
	docker rm $$(docker ps -q -f status=exited)
	docker rmi -f $$(docker images -qa)
