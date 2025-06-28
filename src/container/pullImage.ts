import Docker from 'dockerode';

const docker = new Docker();

export default async function pullImage(imageName: string): Promise<any> {
    console.log('inside pullImage');

    return new Promise((resolve, reject) => {
        docker.pull(imageName, (err: Error | null, stream: NodeJS.ReadableStream) => {
            if (err) return reject(err);

            docker.modem.followProgress(
                stream,
                function onFinished(err: Error | null, output: any) {
                    if (err) return reject(err);
                    console.log('Image pulled successfully');
                    resolve(output);
                },
                function onProgress(event: any) {
                    if (event.status) {
                        console.log(`${event.status} ${event.progress || ''}`.trim());
                    }
                }
            );
        });
    });
}
