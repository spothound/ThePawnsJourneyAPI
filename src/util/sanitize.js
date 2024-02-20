// function to sanitize limit query parameter

function sanitize_rating_range(min, max) {
    min = parseInt(min);
    max = parseInt(max);
    if (isNaN(min) || isNaN(max)) {
        return { min: 0, max: 100 };
    }
    if (min < 0) min = 0;
    if (max > 3550) max = 3550; // biggest rating in the dataset is 3330
    if (min > 3550) min = 3550;
    if (max < 0) max = 0;
    if (min > max) {
        return { min: max, max: min };
    }
    return { min, max };
}

function sanitize_puzzles_limit(limit) {
    limit = parseInt(limit);
    if (isNaN(limit)) return 100;
    if (limit > 100) return 100;
    if (limit < 1) return 1;
    return limit;
}

module.exports = {
    sanitize_puzzles_limit,
    sanitize_rating_range,
};
