import createContainer from "./container";
import pullImage from "./pullImage";
import { PYTHON_IMAGE } from "../utils/constants";
import decodeDockerStream from "./dockerHelper";


export default class runPython {


    async execute(code: string,inputTestCase : string) {

        type buffer = Buffer[];

        const rowcodeBuffer: buffer = [];

        await pullImage(PYTHON_IMAGE);

        const command =  `echo '${code.replace(/'/g, `'\\"`)}' > test.py && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | python3 test.py`;;

        const pythonContainer = await createContainer(PYTHON_IMAGE,  [
            '/bin/sh', 
            '-c',
            command
        ]);

        await pythonContainer.start();


        const logStream = await pythonContainer.logs({
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
            await pythonContainer.remove();

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