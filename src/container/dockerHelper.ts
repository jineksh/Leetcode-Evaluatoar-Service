import { DOCKER_STREAM_HEADER_SIZE } from '../utils/constants'


interface dockerStreamOutput {
    stdout: string,
    stderr: string
}

export default function decodeDockerStream(buffer: Buffer): dockerStreamOutput {

    let offset = 0;

    const output: dockerStreamOutput = {
        stdout: '',
        stderr: ''
    };


    while (offset < buffer.length) {


        const typeOfStream = buffer[offset];

        const length = buffer.readUint32BE(offset + 4);

        if (offset + length > buffer.length) {
            console.warn(' Buffer overflow detected. Skipping chunk.');
            break;
        }

        offset += DOCKER_STREAM_HEADER_SIZE;

        if (typeOfStream === 1) {
            output.stdout += buffer.toString('utf-8', offset, offset + length);
        }
        else if (typeOfStream === 2) {
            output.stderr += buffer.toString('utf-8', offset, offset + length);
        }
        offset += length;
    }

    return output;

}
