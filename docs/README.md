# Hosting Guidelines

1. Updating the system 
```
sudo apt-get update
```


## Setup the Database 


1. Installing PostgreSQL database.

```
sudo apt install postgresql postgresql-client
```

2. Login as `psql`

``` 
sudo su -l postgres
```

3. Enter into the PSQL 

```
psql
```

4. Create role and give rights

```
```

5. Login with role and create database and migrations

```
```



- Tips 

1. Starting, stopping, enabling and checking the status of the service.
```
sudo systemctl stop postgresql.service
sudo systemctl start postgresql.service
sudo systemctl enable postgresql.service
sudo systemctl status postgresql.service
```



## Setup `main-api` 

1. After moving the files in a specified directory, start installing the packages. 

```
```

2. Check and build the code

```
```

3. Install `pm2`

```
npm install pm2 -g
```

4. Start built application

```
pm2 start server.js
```

5.  Enable auto-start

```
sudo env PATH=$PATH:/usr/local/bin pm2 startup -u safeuser
```


## Setup Dashboard 

1. After moving the files in a specified directory, start installing the packages. 

```
```

2. Check and build the code

```
```

3. Install nginx

```
sudo apt update
sudo apt install nginx -y
```

4. Configure nginx 

```
cd /etc/nginx/sites-available
sudo nano react-tutorial
```

In the conf 

```
server {
	listen 80 default_server;
	listen [::]:80 default_server;


	root /var/www/html;

	index index.html index.htm index.nginx-debian.html;

	server_name _;

	location / {
		# serve static frontend first
		try_files $uri $uri/ /index.html;
	}

	location /api {
		proxy_pass http://localhost:4000;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection 'upgrade';
		proxy_set_header Host $host;
		proxy_cache_bypass $http_upgrade;
	}
}

```

5. Activate symlink

```
sudo ln -s /etc/nginx/sites-available/react-tutorial /etc/nginx/sites-enabled/
```

6. Check nginx conf

```
sudo nginx -t
```

7. Restart nginx
```
sudo systemctl restart nginx
```

## Environment Variables 

1. Go to Environment Variables

```
sudo nano /etc/environment
```

2. Set environment variables 

```
MY_VAR="hello"
```

3. Check if it works

```
echo $MY_VAR
```


## CI/CD: Github Workflows 
