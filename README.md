# Serverless Coding

NestJS + Postgres + Serverless + AWS Lamdba.

## Prerequisite

- Copy `.env` as `.env.local` and replace `<TO_BE_REPLACED>` with your variables
- AWS IAM API key and secret with at least these permissions:
    - AWSCloudFormationFullAccess
    - AmazonS3FullAccess
    - IAMFullAccess
    - AmazonAPIGatewayInvokeFullAccess
    - AmazonAPIGatewayAdministrator
    - AmazonAPIGatewayPushToCloudWatchLogs
    - AWSLambda_FullAccess

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Serverless

```bash
# start
$ serverless offline

# configure credentials
$ serverless config credentials --provider aws --key <TO_BE_REPLACED> --secret <TO_BE_REPLACED>

# deploy
$ serverless deploy

# remove
$ serverless remove

# check logs
$ serverless logs -f main
```
