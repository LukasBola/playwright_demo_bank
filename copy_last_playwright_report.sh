# This script is used to download a zip file from a given URL, unzip it, and move the unzipped contents to a specified directory with a timestamp.
timestamp=$(date +%Y%m%d%H%M%S)
new_zip=~/Downloads/playwright-report-$timestamp.zip
mv ~/Downloads/playwright-report.zip $new_zip
if [ -d /tmp/playwright-report-unzipped ]; then
    rm -rf /tmp/playwright-report-unzipped/*
fi
unzip -q $new_zip -d /tmp/playwright-report-unzipped
mkdir -p /Users/lukaszbola/Documents/jaktestowac/projects/demo-bank-test/playwright-report-$timestamp/
cp -R /tmp/playwright-report-unzipped/* /Users/lukaszbola/Documents/jaktestowac/projects/demo-bank-test/playwright-report-$timestamp/
rm -rf ~/Downloads/playwright-report*