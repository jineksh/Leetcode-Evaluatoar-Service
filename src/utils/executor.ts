import runCpp from "../container/runCpp";
import runJava from "../container/runJava";
import runPython from "../container/runPython";

export default function(language : string){

    if(language.toLowerCase() === 'python'){
        return new runPython();
    }
    else if(language.toLowerCase() === 'cpp'){
        return new runCpp();
    }
    else if(language.toLowerCase() === 'java'){
        return new runJava();
    }

}