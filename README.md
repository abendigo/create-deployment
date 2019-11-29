<p align="center">
  <a href="https://github.com/abendigo/create-deployment"><img alt="GitHub Actions status" src="https://github.com/abendigo/create-deployment/workflows/test-local/badge.svg"></a>
</p>

# Create a Deployment via GitHub Deployments API

See https://developer.github.com/v3/repos/deployments/

## Usage

```workflow
name: 'Create Deployment'
on:
  push:
    branches:
      - master

jobs:
  create-deplyment:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - name: Generate VERSION
        run: echo "::set-env name=VERSION::$(git describe --tags --always --dirty)"
      - name: Create Deployment
        id: deploy
        uses: abendigo/create-deployment@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          payload: ${{ env.VERSION }}
      - name: Get the deplopyment ID
        run: echo "The deployment ID was ${{ steps.deploy.outputs.id }}"
```

## License

All scripts and documentation in this project are released under the [MIT License](LICENSE).
