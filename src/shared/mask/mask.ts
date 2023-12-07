export const dateMask = {
    mask: [
        ...Array(2).fill(/\d/),
        '/',
        ...Array(2).fill(/\d/),
        '/',
        ...Array(4).fill(/\d/),
    ],
};

export const phoneMask = {
    mask: [
        ...Array(3).fill(/\d/),
        ' ',
        ...Array(3).fill(/\d/),
        ' ',
        ...Array(2).fill(/\d/),
        ' ',
        ...Array(2).fill(/\d/),
    ],
};
