const isEmptyOrSpaces = (str) => {
    return str === null || str.match(/^\s*$/) !== null;
}

export default isEmptyOrSpaces;