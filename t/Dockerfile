# DOCKER_NAME=ngcp-csc-jessie
FROM docker.mgm.sipwise.com/sipwise-jessie:latest

# Important! Update this no-op ENV variable when this Dockerfile
# is updated with the current date. It will force refresh of all
# of the base images and things like `apt-get update` won't be using
# old cached versions when the Dockerfile is built.
ENV REFRESHED_AT 2016-10-21

RUN echo "deb https://deb.sipwise.com/autobuild/ release-trunk-jessie main" >>/etc/apt/sources.list

RUN apt-get update
RUN apt-get install --assume-yes \
        curl \
        unzip \
        default-jre \
        nodejs \
        nodejs-legacy \
        npm


RUN adduser --disabled-password --gecos=Selenium-User selenium

WORKDIR /home/selenium
RUN wget -O selenium-server-standalone-2.53.1.jar http://selenium-release.storage.googleapis.com/2.53/selenium-server-standalone-2.53.1.jar
RUN ln -s selenium-server-standalone-2.53.1.jar selenium-server-standalone.jar

RUN curl -sL https://deb.nodesource.com/setup_4.x | bash -
RUN apt-get install -y nodejs

RUN curl -o /cmd.sh.zip https://deb.sipwise.com/files/SenchaCmd-6.2.0-linux-amd64.sh.zip && \
        unzip -p /cmd.sh.zip > /cmd-install.sh && \
        chmod +x /cmd-install.sh && \
        /cmd-install.sh -q -dir "/bin/Sencha/Cmd/6.2.0.103/" && \
        rm /cmd-install.sh /cmd.sh.zip

RUN echo "cd /code && sencha app build -c && ./t/testrunner" >/root/.bash_history

WORKDIR /home/selenium

################################################################################
# Instructions for usage
# ----------------------
# When you want to build the base image from scratch (jump to the next section if you don't want to build yourself!):
# % docker build --tag="ngcp-csc-jessie" .
# % docker run --rm -i -t -v $(pwd)/..:/code:rw ngcp-csc-jessie:latest bash
#
# Use the existing docker image:
# % docker pull docker.mgm.sipwise.com/ngcp-csc-jessie
# % docker run --rm -i -t -v $(pwd)/..:/code:rw docker.mgm.sipwise.com/ngcp-csc-jessie:latest bash
#
# Inside docker:
#   su - selenium
#   cd /code && ./t/selenium/testrunner
################################################################################
