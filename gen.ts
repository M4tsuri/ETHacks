#!/usr/local/bin/ts-node

import workspace from "./package.json"
import fs from "fs-extra";

const src = "./template"
const dest = process.argv[2]

fs.copy(src, dest)
    .then(async () => {
        workspace.workspaces.push(`${dest}/contracts`);
        workspace.workspaces.push(`${dest}/play`);
        await fs.writeFile("./package.json", JSON.stringify(workspace, null, 2));
        console.log(`Finished creating project ${dest}.`)
    })
    .catch(e => {
        console.log(`Error: ${e}`)
    })




