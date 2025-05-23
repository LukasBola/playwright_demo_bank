# This script is used to download a zip file from a given URL, unzip it, and move the unzipped contents to a specified directory with a timestamp.
timestamp=$(date +%Y%m%d%H%M%S)
DOWNLOADS_DIR=~/Downloads
UNZIP_DIR=/tmp/playwright-report-unzipped
DEST_DIR=~/Documents/jaktestowac/projects/demo-bank-test
ZIP_FILE=$DOWNLOADS_DIR/playwright-report-$timestamp.zip
REPORT_DIR=$DEST_DIR/playwright-report-$timestamp

mv $DOWNLOADS_DIR/playwright-report.zip $ZIP_FILE
if [ -d $UNZIP_DIR ]; then
    rm -rf $UNZIP_DIR/*
fi
unzip -q $ZIP_FILE -d $UNZIP_DIR
mkdir -p $REPORT_DIR/
cp -R $UNZIP_DIR/* $REPORT_DIR/
rm -rf $DOWNLOADS_DIR/playwright-report*