import { env } from "process";
import { AzureDevOpsApi } from "../index.js";

const PAT = env['PAT'] ?? 'XXX';

async function run() {
    const api = new AzureDevOpsApi('foa-it', PAT);

    const packages = await api.artifacts.listPackages('fiks', {
        includeAllVersions: true,
        protocolType: 'Npm',
        $top: 1
    });

    const packageId = packages[0].id;
    const packageVersionId = packages[0].versions[0].id;

    // console.log({ packageId, packageVersionId });

    const packageVersion = await api.artifacts.getPackageVersion('fiks', packageId, packageVersionId, {
        includeUrls: false
    });
    console.log(packageVersion);
}

run().then(
    () => { },
    err => {
        console.error(err);
    }
);