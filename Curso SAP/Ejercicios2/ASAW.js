

async function sleep(s) {
    await new Promise(resolve => setTimeout(resolve, s));
}

async function taskOne() {
    try{
        throw new Error("Some problem");
        await sleep(4000);
        return "ONE VALUE";
    } catch (err) {
        console.log(err);
    }

}

async function taskTwo() {
    try{
        //throw new Error("Some problem");
        await sleep(2000);
        return "TWO VALUE";
    } catch (err) {
        console.log(err);
    }
}

async function main() {
    try{
        console.time("Measuring time");
        const results = await Promise.all([taskOne(), taskTwo()]);
        //const valueOne = await taskOne();
        //const valueTwo = await taskTwo();
        console.timeEnd("Measuring time");

        //console.log("Task One ret", valueOne);
        //console.log("Task Two ret", valueTwo);
        console.log("Task One ret", results[0]);
        console.log("Task Two ret", results[1]);
    } catch (err) {
        console.log(err);
    }
}

main();