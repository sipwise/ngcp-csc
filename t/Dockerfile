# DOCKER_NAME=ngcp-csc-jessie
FROM docker.mgm.sipwise.com/sipwise-jessie:latest

# Important! Update this no-op ENV variable when this Dockerfile
# is updated with the current date. It will force refresh of all
# of the base images and things like `apt-get update` won't be using
# old cached versions when the Dockerfile is built.
ENV REFRESHED_AT 2016-11-30

RUN echo "deb https://deb.sipwise.com/autobuild/ release-trunk-jessie main" >>/etc/apt/sources.list

RUN apt-get update
RUN apt-get install --assume-yes \
        chromium \
        curl \
        devscripts \
        libgconf-2-4 \
        nodejs \
        openjdk-8-jre-headless \
        sencha-cmd \
        unzip \
        xvfb

RUN adduser --disabled-password --gecos=Selenium-User selenium
WORKDIR /home/selenium
RUN wget -O selenium-server-standalone-3.0.1.jar http://selenium-release.storage.googleapis.com/3.0/selenium-server-standalone-3.0.1.jar
RUN ln -s selenium-server-standalone-3.0.1.jar selenium-server-standalone.jar

RUN wget -O chromedriver_linux64.zip https://deb.sipwise.com/files/chromedriver_linux64_2.25.zip && unzip chromedriver_linux64.zip

ADD xvfb-chromium /usr/bin/xvfb-chromium
RUN ln -s /usr/bin/xvfb-chromium /usr/bin/google-chrome
RUN ln -s /usr/bin/xvfb-chromium /usr/bin/chromium-browser

RUN echo "cd /code && ./t/testrunner" >/root/.bash_history

RUN ln -s /home/selenium/chromedriver /usr/bin/chromedriver

COPY jenkins_docker_run /home/selenium/

WORKDIR /home/selenium/

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
#   cd /code && ./t/testrunner
################################################################################
