import { env } from "process";
import { AzureDevOpsApi } from "../index.js";

const PAT = env['PAT'] ?? 'XXX';

async function test() {
    const api = new AzureDevOpsApi('foa-it', PAT);

    try {
        const packages = await api.artifacts.listPackages('fiks', {
            includeAllVersions: true,
            protocolType: 'Npm'
        });

        return `${packages.length} packages`;
    }
    catch (err: any) {
        return err.message;
    }
}

async function run() {
    const results = await Promise.all([
        test(),
        test(),
        test(),
        test(),
        test(),
        test(),
        test(),
        test(),
        test(),
        test(),
    ]);

    console.log();
    console.log(results.join('\n'));
}

run().then(
    () => { },
    err => {
        console.error(err);
    }
);