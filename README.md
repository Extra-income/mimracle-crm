# mimracle-crm

## nginx配置
站点需要使用到nginx，根据访问域名在http header中加上对应的api_key。
记得在host上配上nginx监听域名crm.micracle.china.com，指向本机即可
>>> 127.0.0.1 crm.micracle.china.com
