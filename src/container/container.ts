import dockerode from "dockerode";

export default async function createContainer(imageName : string, cmdExec : string[]) {
    console.log('inside createcontainer');

    const docker = new dockerode();


    const container = docker.createContainer({
        Image: imageName,
        Cmd: cmdExec,
        Tty: false, // false for parsing stdout/stderr separately
        AttachStdout: true,
        AttachStderr: true,
        OpenStdin : true,
        HostConfig : {
            Memory: 1024 * 1024 * 1024
        }
    });

    return container;

}