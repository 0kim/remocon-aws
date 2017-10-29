VERSION=0.11
DEPLOY_TARGET=(
    "_locales"
    "assets"
    "js"
    "manifest.json"
    "popup.html"
)

# Check GA_CODE (Google Analytic code)
if [ $GA_CODE ];
then
    echo "GA_CODE($GA_CODE) is used."
else
    echo "Please specify GA_CODE variable."
    exit
fi

# check APP_ID (Google Extension ID)
if [ $APP_ID ];
then
    echo "APP_ID($APP_ID) is used."
else
    echo "Please specify APP_ID variable."
    exit
fi

# Clean dist directory
echo "cleaning dist directory..."
rm -rf ./dist/*

# Deploy code
echo "deploying targets to dist directory..."
for v in ${DEPLOY_TARGET[@]}
do
    cp -r $v dist
done

# Find and Replace ga code
echo "updating relevant variables...."
ga_js_files=("dist/js/popup.js" "dist/js/eventPage.js")
SED_PARAM=s/UA-XXXXXXXX-X/$GA_CODE/g
for v in "${ga_js_files[@]}"; do
    sed -i -e $SED_PARAM $v
done

# find and replace extension id cod
echo "updating relevant variables...."
app_id_files=("dist/js/remocon-aws.js")
SED_PARAM=s/{{APP_ID}}/$APP_ID/g
for v in "${app_id_files[@]}"; do
    sed -i -e $SED_PARAM $v
done

# Delete redundant files
rm dist/js/*.js-e

# Compress
cd dist; zip -r remo_for_aws_$VERSION.zip ${DEPLOY_TARGET[@]}

