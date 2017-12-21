# For reference only

FROM websphere-liberty
ADD target/Cycle.war /opt/ibm/wlp/usr/servers/defaultServer/dropins/
ENV LICENSE accept
EXPOSE 9080

## Running the container locally
# mvn clean install
# docker build -t Cycle:latest .
# docker run -d --name myjavacontainer Cycle
# docker run -p 9080:9080 --name myjavacontainer Cycle
# Visit http://localhost:9080/Cycle/

## Push container to Bluemix
# Install cli and dependencies: https://console.ng.bluemix.net/docs/containers/container_cli_cfic_install.html#container_cli_cfic_install
# docker tag Cycle:latest registry.ng.bluemix.net/<my_namespace>/Cycle:latest
# docker push registry.ng.bluemix.net/<my_namespace>/Cycle:latest
# bx ic images # Verify new image
