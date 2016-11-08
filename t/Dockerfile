# DOCKER_NAME=ngcp-csc-jessie
FROM docker.mgm.sipwise.com/sipwise-jessie:latest

# Important! Update this no-op ENV variable when this Dockerfile
# is updated with the current date. It will force refresh of all
# of the base images and things like `apt-get update` won't be using
# old cached versions when the Dockerfile is built.
ENV REFRESHED_AT 2016-11-10

#RUN echo "deb https://deb.sipwise.com/autobuild/ release-trunk-jessie main" >>/etc/apt/sources.list

#chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list

RUN apt-get update
RUN apt-get install --assume-yes \
        devscripts \
        fluxbox \
        git \
        iceweasel \
        libtap-formatter-junit-perl \
        lsof \
        net-tools \
        openjdk-7-jre-headless \
        vim-tiny \
        vnc4server \
        wget \
        xterm \
        curl \
        chromium \
        unzip

RUN adduser --disabled-password --gecos=Selenium-User selenium

WORKDIR /home/selenium
RUN wget -O selenium-server-standalone-2.53.1.jar http://selenium-release.storage.googleapis.com/2.53/selenium-server-standalone-2.53.1.jar
RUN ln -s selenium-server-standalone-2.53.1.jar selenium-server-standalone.jar

RUN wget -O chromedriver_linux64.zip http://chromedriver.storage.googleapis.com/2.22/chromedriver_linux64.zip && unzip chromedriver_linux64.zip

RUN curl -sL https://deb.nodesource.com/setup_4.x | bash -
RUN apt-get install -y nodejs

RUN echo "cd /code && /opt/Sencha/Cmd/sencha app build -c && ./t/testrunner" >/home/selenium/.bash_history
RUN echo "su - selenium" >/root/.bash_history
EXPOSE 5999 3000

WORKDIR /usr/bin
RUN ln -s /home/selenium/chromedriver chromedriver

COPY jenkins_docker_run /home/selenium/

WORKDIR /home/selenium

################################################################################
# Instructions for usage
# ----------------------
# When you want to build the base image from scratch (jump to the next section if you don't want to build yourself!):
# % docker build --tag="ngcp-csc-jessie" .
# % docker run --rm -p 5999:5999 -p 3000:3000 -i -t -v $(pwd)/..:/code:rw ngcp-csc-jessie:latest bash
#
# Use the existing docker image:
# % docker pull docker.mgm.sipwise.com/ngcp-csc-jessie
# % docker run --rm -i -t -v $(pwd)/..:/code:rw docker.mgm.sipwise.com/ngcp-csc-jessie:latest bash
#
# Inside docker:
#   su - selenium
#   cd /code && /opt/Sencha/Cmd/sencha app build -c && ./t/testrunner
################################################################################
