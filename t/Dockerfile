# DOCKER_NAME=janus-client-jessie
FROM docker.mgm.sipwise.com/sipwise-jessie:latest

# Important! Update this no-op ENV variable when this Dockerfile
# is updated with the current date. It will force refresh of all
# of the base images and things like `apt-get update` won't be using
# old cached versions when the Dockerfile is built.
ENV REFRESHED_AT 2016-10-18

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

RUN curl -o /cmd.sh.zip http://cdn.sencha.com/cmd/6.2.0/no-jre/SenchaCmd-6.2.0-linux-amd64.sh.zip && \
        unzip -p /cmd.sh.zip > /cmd-install.sh && \
        chmod +x /cmd-install.sh && \
        /cmd-install.sh -q -dir "/bin/Sencha/Cmd/6.2.0.103/" && \
        rm /cmd-install.sh /cmd.sh.zip

RUN echo "cd /code && sencha app build -c" >/root/.bash_history

# TODO - create testrunner, commenting out line below for now
# RUN echo "cd /code && ./t/testrunner" >/root/.bash_history

WORKDIR /code
