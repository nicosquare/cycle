# For reference only

FROM websphere-liberty
ADD target/WatGov.war /opt/ibm/wlp/usr/servers/defaultServer/dropins/
ENV LICENSE accept
EXPOSE 9080

## Running the container locally
# mvn clean install
# docker build -t WatGov:latest .
# docker run -d --name myjavacontainer WatGov
# docker run -p 9080:9080 --name myjavacontainer WatGov
# Visit http://localhost:9080/WatGov/

## Push container to Bluemix
# Install cli and dependencies: https://console.ng.bluemix.net/docs/containers/container_cli_cfic_install.html#container_cli_cfic_install
# docker tag WatGov:latest registry.ng.bluemix.net/<my_namespace>/WatGov:latest
# docker push registry.ng.bluemix.net/<my_namespace>/WatGov:latest
# bx ic images # Verify new image
