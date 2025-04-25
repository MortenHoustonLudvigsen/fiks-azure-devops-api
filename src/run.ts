import { AzureDevOpsApi } from "./index.js";

const PAT = `XXX`;

async function run() {
    const api = new AzureDevOpsApi('foa-it', PAT);

    const packages = await api.artifacts.listPackages('fiks', {
        includeAllVersions: true,
        protocolType: 'Npm'
    });

    console.log(packages);
}

run().then(
    () => {},
    err => {
        console.error(err);
    }
);