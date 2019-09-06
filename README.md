View images from AWS S3 with AWS Amplify.

## How to run?
Before you can run the app you have to setup AWS Amplify with added `auth` and `storage`.<br>
You need to add `awsConfig.js` file in the `src/` directory.
You can get this from Amplify generated file.<br>
The config file is in the form:

```javascript
export default {
  aws_project_region: "region",
  aws_cognito_identity_pool_id: "pool_id",
  aws_cognito_region: "region",
  aws_user_pools_id: "pool_id",
  aws_user_pools_web_client_id: "client_id",
  aws_appsync_graphqlEndpoint: "graphql_endpoint",
  aws_appsync_region: "appsync_region",
  aws_appsync_authenticationType: "auth_type",
  aws_user_files_s3_bucket: "bucket_name",
  aws_user_files_s3_bucket_region: "bucket_region"
};
```

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
