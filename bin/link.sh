APP_DIR=$(pwd)
APP_CMD=scrap
cd /usr/local/bin && ln -sf $APP_DIR/bin/index.js $APP_CMD && chmod +x $APP_CMD && cd $APP_DIR
