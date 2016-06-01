
resource "aws_iam_role" "lambda_function" {
  name = "mjml101_lambda_function"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "cloudwatchlogs_full_access" {
  name = "cloudwatchlogs_full_access"
  role = "${aws_iam_role.lambda_function.id}"
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:*"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "read_dynamodb" {
  name = "read_dynamodb"
  role = "${aws_iam_role.lambda_function.id}"
  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Stmt1462262083000",
            "Effect": "Allow",
            "Action": [
                "dynamodb:GetItem",
                "dynamodb:ListTables"
            ],
            "Resource": [
                "arn:aws:dynamodb:ap-northeast-1:153108345098:table/lambda_config"
            ]
        }
    ]
}
EOF
}
