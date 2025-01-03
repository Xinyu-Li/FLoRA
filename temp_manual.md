Moodle

Online confirm

auto enrol


1. moodle 安装完plugin 如果无法访问，则尝试清除浏览器缓存，或使用匿名模式打开

2. 在Moodle Appearance -》Additional HTML 页面 添加下面代码
<script>
/*使用此代码使页面link 无效*/
window.onload = function(){
   console.log("div.courseindex-section");
	let elementsTagA = document.getElementsByClassName("courseindex-link text-truncate");
	console.log(elementsTagA);
	console.log(elementsTagA.length);
	for (let i = 0; i < elementsTagA.length; i++) {
		console.log(elementsTagA[i].dataset.for);
		if (elementsTagA[i].dataset.for === "section_title") {
			elementsTagA[i].href = "#";
		}
	}
};


</script>

3. 在Moodle Plugins -》 Generico tamplate 页面添加 template


4. php + apache + redis + phpMyAdmin
   wget -c http://mirrors.linuxeye.com/oneinstack-full.tar.gz && tar xzf oneinstack-full.tar.gz && ./oneinstack/install.sh --apache  --apache_mpm_option 1 --apache_mode_option 1 --php_option 9 --phpcache_option 1 --php_extensions fileinfo,imap,redis,memcached --phpmyadmin  --db_option 2 --dbinstallmethod 1 --dbrootpwd 1q2w3e4R --pureftpd  --redis  --memcached  --reboot

--install redis docker
docker run --name my-redis -d -p 6379:6379 redis


5. install java
   https://www.cjavapy.com/article/90/
   https://www.jianshu.com/p/5a25b9535016

6. install elasticsearch
   https://blog.csdn.net/hzp666/article/details/123550197
   https://blog.csdn.net/weixin_30587927/article/details/99054307

--install elasticsearch docker
docker run --name elasticsearch-instance -d -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.15.0



7. install zookeeper
   --automatic restart
   docker run -d --restart=always --log-driver json-file --log-opt max-size=100m --log-opt max-file=2 --name zookeeper -p 2181:2181 -v /etc/localtime:/etc/localtime zookeeper
   --manual restart
   docker run -d --log-driver json-file --log-opt max-size=100m --log-opt max-file=2 --name zookeeper -p 2181:2181 -v /etc/localtime:/etc/localtime zookeeper


8. install kafka // ip地址需要改为本机ip地址
   #kafka university
   docker run -d --log-driver json-file --log-opt max-size=100m --log-opt max-file=2 --name kafka -p 9092:9092 -e KAFKA_BROKER_ID=0 -e KAFKA_ZOOKEEPER_CONNECT=130.194.73.139:2181/kafka -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://130.194.73.139:9092 -e ALLOW_PLAINTEXT_LISTENER=yes -e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 -v /etc/localtime:/etc/localtime bitnami/kafka
   #kafka home
   docker run -d --log-driver json-file --log-opt max-size=100m --log-opt max-file=2 --name kafkae -p 9092:9092 -e KAFKA_BROKER_ID=0 -e KAFKA_ZOOKEEPER_CONNECT=130.194.236.126:2181/kafka -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://130.194.236.126:9092 -e ALLOW_PLAINTEXT_LISTENER=yes -e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 -v /etc/localtime:/etc/localtime bitnami/kafka

9. install mysql
   docker run -d -p 3306:3306 --name mysql_container -e MYSQL_ROOT_PASSWORD=1q2w3e4R mysql:latest


setup stop program script
stop_flora.sh


in Windows OS, kill all nginx command: taskkill /IM  nginx.exe  /F

kill $(ps aux | grep 'FLoRA_backend-2.1.5.jar' | grep -v grep | awk '{print $2}')

nohup java -jar FLoRA_backend-2.1.6.jar --server.name=hku > /dev/null 2>&1 &

In Linux, delete all the python libs
pip freeze | grep -v '^@' | xargs pip uninstall -y

