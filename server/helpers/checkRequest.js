export const validateRequest = (request) => {
    const errors = [];
    for (const [key, value] of Object.entries(request)) if (!value) errors.push(`${key} cannot be empty`);

    return errors;
};

export const validateOrigin = (request) => {
    const allowOriginPort = "5173";
    return request.headers.origin.includes(allowOriginPort);
};
