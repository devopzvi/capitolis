# **Slack-bot service**

This project uses a javascript open-source slack bot for opening tickets inside a slack-channel.
It wraps the code into an image and stores it on dockerhub.
For any change in main branch, the project will automatically trigger a CI that tests, builds, creates a new helm chart and finally deploys to k8s environment.

---

## Elaboration:

- This project is derived from https://github.com/slackapi/template-slash-command-and-dialogs.
- For the purpose of concept, a new slack workspace with a dedicated channel was created as well as slack-api configurations.
- Inside this repository you will find the following:
  - A full helm chart of which contains a deployment with a pod that listens for calls to slack service.
  - An Action that can be triggered manually: `build-push-docker-image`. This action builds new image versions and pushes to dockerhub: https://hub.docker.com/r/devopzvi/slack/tags
  - Another action: `CI/CD Pipeline` of which being triggered automatically in any push to main branch.

CI/CD Pipeline:
- As this is a javascript project, this pipeline runs `npm` commands to build and test the code.
- If the first steps has passed susscefully, we arrive at the helm build and then publish.
- We first configure our helm registry (chartmuseum for example). `helm lint` is for validating the chart that is about to be deployed soon. 
- Once all has passed, the last step deploys the new chart version onto k8s env. 
