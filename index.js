const core = require("@actions/core");
const github = require("@actions/github");

const isNotEmpty = value => value !== null && value.length > 0;

async function run() {
  try {
    const token = core.getInput("token", { required: true });
    const ref = core.getInput("ref");
    const task = core.getInput("task");
    const payload = core.getInput("payload");
    const environment = core.getInput("environment");
    const description = core.getInput("description");

    const [owner, repo] = process.env["GITHUB_REPOSITORY"].split("/");

    console.log({ token, ref, task, payload, environment, description });
    console.log({ owner, repo });

    const octokit = new github.GitHub(token);

    const request = {
      owner,
      repo,
      required_contexts: [],
      ...{ ref: isNotEmpty(ref) ? ref : process.env["GITHUB_REF"] },
      ...(isNotEmpty(task) && { task }),
      ...(isNotEmpty(payload) && { payload }),
      ...(isNotEmpty(environment) && { environment }),
      ...(isNotEmpty(description) && { description })
    };

    console.log({ request });

    // const ref = github.context.payload.ref;

    // https://octokit.github.io/rest.js/
    const {
      data: { id }
    } = await octokit.repos.createDeployment(request);
    console.log("id", id);

    core.setOutput("id", id);
  } catch (error) {
    console.log("error", error);
    core.setFailed(error.message);
  }
}

run();
