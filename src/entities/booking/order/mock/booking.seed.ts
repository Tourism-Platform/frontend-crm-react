import { Gender } from "../../../../shared/api/generated/Api";
import { BOOKING_PASSENGER_PATHS } from "../../../../shared/api/generated/paths";

export type TBookingPaxSeedItem = ReturnType<
	typeof BOOKING_PASSENGER_PATHS.addPassengerInfo
>["_types"]["body"];

export const BOOKING_PAX_SEED: readonly TBookingPaxSeedItem[] = [
	{
		full_name: "Ivan Petrov",
		gender: Gender.M,
		nationality: "UZ",
		date_of_birth: "1990-03-15",
		passport_number: "AA1234567",
		expired_date: "2030-03-15",
		comment: null
	},
	{
		full_name: "Maria Petrova",
		gender: Gender.F,
		nationality: "UZ",
		date_of_birth: "1992-07-22",
		passport_number: "AA7654321",
		expired_date: "2031-07-22",
		comment: null
	},
	{
		full_name: "Alex Kim",
		gender: Gender.M,
		nationality: "KZ",
		date_of_birth: "1988-11-05",
		passport_number: "N12345678",
		expired_date: "2029-11-05",
		comment: null
	},
	{
		full_name: "Elena Sokolova",
		gender: Gender.F,
		nationality: "RU",
		date_of_birth: "1995-01-18",
		passport_number: "75AB123456",
		expired_date: "2032-01-18",
		comment: null
	},
	{
		full_name: "John Smith",
		gender: Gender.M,
		nationality: "US",
		date_of_birth: "1985-09-30",
		passport_number: "P99887766",
		expired_date: "2028-09-30",
		comment: null
	},
	{
		full_name: "Sara Ahmed",
		gender: Gender.F,
		nationality: "AE",
		date_of_birth: "1993-04-12",
		passport_number: "C11223344",
		expired_date: "2033-04-12",
		comment: null
	},
	{
		full_name: "Omar Karimov",
		gender: Gender.M,
		nationality: "UZ",
		date_of_birth: "1991-06-08",
		passport_number: "AB9988776",
		expired_date: "2030-06-08",
		comment: null
	},
	{
		full_name: "Anna Novak",
		gender: Gender.F,
		nationality: "PL",
		date_of_birth: "1994-12-01",
		passport_number: "EF5566778",
		expired_date: "2031-12-01",
		comment: null
	},
	{
		full_name: "James Wilson",
		gender: Gender.M,
		nationality: "GB",
		date_of_birth: "1987-02-25",
		passport_number: "GB1234567",
		expired_date: "2029-02-25",
		comment: null
	},
	{
		full_name: "Dilnoza Rakhimova",
		gender: Gender.F,
		nationality: "UZ",
		date_of_birth: "1996-08-14",
		passport_number: "AA3344556",
		expired_date: "2034-08-14",
		comment: null
	}
] as const;

/** Random pax count > 3, then shuffled subset from seed pool. */
export function pickRandomBookingPax(): TBookingPaxSeedItem[] {
	const min = 4;
	const max = BOOKING_PAX_SEED.length;
	const count = min + Math.floor(Math.random() * (max - min + 1));
	const shuffled = [...BOOKING_PAX_SEED].sort(() => Math.random() - 0.5);
	return shuffled.slice(0, count);
}

export function buildPassportFile(fullName: string): File {
	const label = `Passport ${fullName}`;
	return new File([label], `${label}.txt`, { type: "text/plain" });
}
