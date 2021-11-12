const firstToUpper = word => {
    return word
    .toLowerCase()
    .split(' ')
    .map(letter => letter.charAt(0).toUpperCase() + letter.slice(1))
    .join(' ');
}

export default firstToUpper