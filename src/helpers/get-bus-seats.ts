export const getSeats = (
    seatNumber: number,
    seatsPerRow: number,
    cb?: (seatName?: string, index?: number) => void
): string[] => {
    let l = 0,
        k = 0;
    let seats: string[] = [];
    for (let i = 0; i < seatNumber; i++) {
        if (i > 0 && i % seatsPerRow === 0) {
            k++;
            l = 0;
        }
        let char: string = String.fromCharCode(65 + k);
        char = char + "" + (l + 1);
        seats.push(char);
        cb?.(char, i);
        l++;
    }
    return seats;
};
