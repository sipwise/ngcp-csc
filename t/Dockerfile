# DOCKER_NAME=ngcp-csc-jessie
FROM docker.mgm.sipwise.com/sipwise-jessie:latest

# Important! Update this no-op ENV variable when this Dockerfile
# is updated with the current date. It will force refresh of all
# of the base images and things like `apt-get update` won't be using
# old cached versions when the Dockerfile is built.
ENV REFRESHED_AT 2016-10-19

# TODO - the release-trunk-jessie is too dynamic yet, though required build deps
RUN echo "deb https://deb.sipwise.com/autobuild/ release-trunk-jessie main" >>/etc/apt/sources.list

RUN apt-get update
RUN apt-get install --assume-yes \
        curl \
        unzip \
        default-jre \
        nodejs \
        nodejs-legacy \
        npm

RUN curl -o /cmd.sh.zip https://deb.sipwise.com/files/SenchaCmd-6.2.0-linux-amd64.sh.zip && \
        unzip -p /cmd.sh.zip > /cmd-install.sh && \
        chmod +x /cmd-install.sh && \
        /cmd-install.sh -q -dir "/bin/Sencha/Cmd/6.2.0.103/" && \
        rm /cmd-install.sh /cmd.sh.zip

RUN echo "cd /code && sencha app build -c" >/root/.bash_history

RUN echo "cd /code && ./t/testrunner" >/root/.bash_history

WORKDIR /code

################################################################################
# Instructions for usage
# ----------------------
# When you want to build the base image from scratch (jump to the next section if you don't want to build yourself!):
# % docker build --tag="repoapi-jessie" .
# % docker run --rm -i -t -v $(pwd)/..:/code:rw repoapi-jessie:latest bash
#
# Use the existing docker image:
# % docker pull docker.mgm.sipwise.com/repoapi-jessie
# % docker run --rm -i -t -v $(pwd)/..:/code:rw docker.mgm.sipwise.com/repoapi-jessie:latest bash
#
# Inside docker (the command is in history, just press UP button):
#   ./t/testrunner
#
# Run django inside docker:
# % pip install -r t/dev.txt && make run_dev
#
# We need a working rabbit server, so in another terminal:
# % docker run --rm --hostname repoapi-rabbit --name repoapi-rabbit rabbitmq:3
#
# use screen to get a working worker in the background:
# % make worker_dev
################################################################################
