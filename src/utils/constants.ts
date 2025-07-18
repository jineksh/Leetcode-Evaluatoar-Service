export const PYTHON_IMAGE = "python:3.8-slim";
export const JAVA_IMAGE = "openjdk:11-jdk-slim"; // docker pull openjdk:11-jdk-slim
export const CPP_IMAGE = "gcc:latest"; // docker pull gcc:latest


export interface CodeRunner {
  execute: (data: string,inputTestCase : string,outputTestcase:string) => Promise<any>;
}


export const submission_queue = "SubmissionQueue";

export const DOCKER_STREAM_HEADER_SIZE = 8; // in bytes