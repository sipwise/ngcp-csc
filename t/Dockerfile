# DOCKER_NAME=ngcp-csc-stretch
FROM docker.mgm.sipwise.com/sipwise-stretch:latest

# Important! Update this no-op ENV variable when this Dockerfile
# is updated with the current date. It will force refresh of all
# of the base images and things like `apt-get update` won't be using
# old cached versions when the Dockerfile is built.
ENV REFRESHED_AT 2017-09-25

# files that get-code generates
COPY t/sources.list.d/builddeps.list /etc/apt/sources.list.d/
COPY t/sources.list.d/preferences /etc/apt/preferences.d/

RUN apt-get update && apt-get install --assume-yes \
        chromium \
        curl \
        devscripts \
        libgconf-2-4 \
        nodejs \
        openjdk-7-jre-headless \
        sencha-cmd \
        unzip \
        xvfb

RUN adduser --disabled-password --gecos=Selenium-User selenium
WORKDIR /home/selenium
RUN wget -O selenium-server-standalone-2.53.1.jar http://selenium-release.storage.googleapis.com/2.53/selenium-server-standalone-2.53.1.jar
RUN ln -s selenium-server-standalone-2.53.1.jar selenium-server-standalone.jar

RUN wget -O chromedriver_linux64.zip https://deb.sipwise.com/files/chromedriver_linux64_2.25.zip && unzip chromedriver_linux64.zip

ADD ./t/xvfb-chromium /usr/bin/xvfb-chromium
RUN ln -s /usr/bin/xvfb-chromium /usr/bin/google-chrome
RUN ln -s /usr/bin/xvfb-chromium /usr/bin/chromium-browser

RUN echo "cd /code && ./t/testrunner" >/root/.bash_history

RUN ln -s /home/selenium/chromedriver /usr/bin/chromedriver

ADD ./t/package.json /tmp/
ADD ./t/.npmrc /tmp/
WORKDIR /tmp
RUN npm install /tmp

WORKDIR /code

################################################################################
# Instructions for usage
# ----------------------
# When you want to build the base image from scratch
# jump to the next section if you don't want to build yourself!:
#
# you need to put the proper NGCP sources at t/sources.list.d/builddeps.list
# for instance, trunk:
# echo "deb https://deb.sipwise.com/autobuild/ release-trunk-stretch main" > t/sources.list.d/builddeps.list
#
# NOTE: run the following commands from root folder of git repository:
# % docker build --tag="ngcp-csc-stretch" -f ./t/Dockerfile .
# % docker run --rm -i -t -v $(pwd):/code:ro -v /results ngcp-csc-stretch:latest bash
#
# Use the existing docker image:
# % docker pull docker.mgm.sipwise.com/ngcp-csc-stretch
# NOTE: run the following command from root folder of git repository:
# % docker run --rm -i -t -v $(pwd):/code:ro -v /results docker.mgm.sipwise.com/ngcp-csc-stretch:latest bash
#
# Inside docker:
#   cd /code && ./t/testrunner
################################################################################
