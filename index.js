const core = require('@actions/core');
const github = require('@actions/github');

const isNotEmpty = value => value !== null && value.length > 0;

async function run() {
  try {
    // Read all the input parameters
    const token = core.getInput('token', { required: true });
    const ref = core.getInput('ref');
    const task = core.getInput('task');
    const payload = core.getInput('payload');
    const environment = core.getInput('environment');
    const description = core.getInput('description');

    // Extract the owner and the repository
    const [owner, repo] = process.env['GITHUB_REPOSITORY'].split('/');

    // Create an instance of https://octokit.github.io/rest.js/
    const octokit = new github.GitHub(token);

    // Create the deployment, and extract the id from the response.
    const {
      data: { id }
    } = await octokit.repos.createDeployment({
      owner,
      repo,
      required_contexts: [],
      ...{ ref: isNotEmpty(ref) ? ref : process.env['GITHUB_REF'] },
      ...(isNotEmpty(task) && { task }),
      ...(isNotEmpty(payload) && { payload }),
      ...(isNotEmpty(environment) && { environment }),
      ...(isNotEmpty(description) && { description })
    });

    //
    core.setOutput('id', id);
  } catch (error) {
    console.log('error', error);
    core.setFailed(error.message);
  }
}

run();
