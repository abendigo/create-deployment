const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    // const contextPayload = JSON.stringify(github.context.payload, undefined, 2);
    // console.log(`The event payload: ${contextPayload}`);

    const token = core.getInput('token', { required: true });
    // const ref = core.getInput("ref");
    const task = core.getInput('task');
    const payload = core.getInput('payload');
    const environment = core.getInput('environment');
    const description = core.getInput('description');

    console.log({ token, ref, task, payload, environment, description });

    const octokit = new github.GitHub(token);

    const [owner, repo] = process.env['GITHUB_REPOSITORY'].split('/');

    // const ref = github.context.payload.ref;
    const ref = process.env['GITHUB_REF'];
    console.log({ owner, repo, ref });

    // console.log('env', process.env);

    // https://octokit.github.io/rest.js/
    // const foo = await octokit.repos.createDeployment({
    console.log({
      owner,
      repo,
      ref,
      required_contexts: [],
      environment,
      payload,
      task,
      description
    });
    // console.log('foo', foo)

    core.setOutput('id', 999);
  }
  catch (error) {
    console.log('error', error)
    core.setFailed(error.message);
  }
}

run();
