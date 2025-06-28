import createContainer from "./container";
import pullImage from "./pullImage";
import { JAVA_IMAGE } from "../utils/constants";
import decodeDockerStream from "./dockerHelper";
import { CodeRunner } from "../utils/constants";

export default class runJava implements CodeRunner {


    async execute(code: string, inputTestCase: string) {

        type buffer = Buffer[];

        const rowcodeBuffer: buffer = [];

        await pullImage(JAVA_IMAGE);

        const runCommand = `
        echo '${code.replace(/'/g, `'\\"`)}' > Main.java && 
        javac Main.java && 
        echo '${inputTestCase.replace(/'/g, `'\\"`)}' | java Main
        `;



        const javaContainer = await createContainer(JAVA_IMAGE, [
            '/bin/sh',
            '-c',
            runCommand
        ]);

        await javaContainer.start();


        const logStream = await javaContainer.logs({
            stdout: true,
            stderr: true,
            timestamps: false,
            follow: true
        });

        logStream.on('data', (chunk) => {
            rowcodeBuffer.push(chunk);
        })

        try {
            const result = await this.fetchExecuteStream(logStream, rowcodeBuffer);
            console.log(result);
            return { output: result, status: "COMPLETED" };
        } catch (error) {
            console.log(error);
            return { output: error, status: "FAILED" };
        }
        finally {
            await javaContainer.remove();

        }
    }

    fetchExecuteStream(logStream: NodeJS.ReadableStream, rowcodeBuffer: Buffer[]) {
        return new Promise((res, rej) => {
            logStream.on('end', () => {
                console.log(rowcodeBuffer);
                const completeBuffer = Buffer.concat(rowcodeBuffer);
                const decodedStream = decodeDockerStream(completeBuffer);
                console.log(decodedStream);
                if (decodedStream.stderr) {
                    rej(decodedStream.stderr);
                } else {
                    res(decodedStream.stdout);
                }
            })
        })
    }




}