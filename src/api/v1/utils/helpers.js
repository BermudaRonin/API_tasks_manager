
export const capitalize = (str = "") => {
    if (typeof str !== "string") {
        throw new Error("Input must be a string");
    }
    if (str.length === 0) {
        return str; // or return "" if you prefer
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const asyncTimeout = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Waited for 10 seconds");
            resolve();
        }, 2000);
    });
}