# ES6ExpressTest
This is a demo application for showing how to set up express with ES6

Kill running port in windows:
netstat -ano | findstr :<yourPortNumber>
taskkill /PID <typeyourPIDhere> /F

# Database Connection Tuning
SHOW VARIABLES LIKE 'max_connections';
SET GLOBAL max_connections = 10;

-- This max_used_connections is different to max_connections
SHOW GLOBAL STATUS LIKE 'max_used_connections';

# Configure Zookeeper Quorum in bashrc
export ZOOKEEPER_QUORUM=192.168.10.10