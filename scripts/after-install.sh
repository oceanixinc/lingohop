#!/bin/bash
cd /home/ubuntu/src/lingohop/server/

source ../../../virtualenvs/lingohop/bin/activate

python manage.py migrate

python manage.py collectstatic --noinput

echo "The AfterInstall deployment lifecycle event successfully completed." > after-install.txt
